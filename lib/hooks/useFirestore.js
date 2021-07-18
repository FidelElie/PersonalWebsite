// ! Next and React
import { useEffect, useState } from "react";
import useSWR from "swr";

// ! Library
import { db } from "../../config/firebase.client";

const useDocument = options => {
  const key = JSON.stringify(options)

  const { data, error, mutate } = useSWR(key, async (key) => {
    const options = JSON.parse(key);
    const { collection, id } = options;

    const collectionRef = db().collection(collection);

    const documentSnapshot = await collectionRef.doc(id).get()

    return documentSnapshot.exists ? documentSnapshot.data() : null;
  });

  return { data, mutate, isLoading: !data && !error, hasError: error }
}

const useCollection = options => {
  const key = JSON.stringify(options);

  const { data, error, mutate } = useSWR(key, async (key) => {
    const options = JSON.parse(key);
    const { collection, orderBy = null, limit = null } = options;

    try {
      const collectionRef = db().collection(collection);
      let request = collectionRef;

      if (orderBy) request.orderBy(orderBy);
      if (limit) request.limit(limit);

      const response = await request.get();

      let collectionResult = [];

      if (!response.empty) {
        response.forEach(doc => { collectionResult.push(doc.data()) })
      }
      return collectionResult;
    } catch (error) { console.log(error); }
  });

  return { data, mutate, isLoading: !data && !error, hasError: error }
}

const useQueryCollection = options => {
  const key = JSON.stringify(options)
  const { data, error, mutate } = useSWR(key, async (key) => {
    const options = JSON.parse(key);
    const {
      collection,
      queries = null,
      orderBy = "id",
      limit = null,
      ascending = false
    } = options;

    try {
      const collectionRef = db().collection(collection);
      let request = collectionRef;

      if (queries) {
        queries.forEach(query => {
          if (!(query instanceof Array))
            throw new TypeError(`A Query must be of type Array, got type ${typeof query}`);

          request = request.where(...query);
        });
      }

      if (orderBy) request.orderBy(orderBy, ascending ? "asc" : "desc");
      if (limit) request.limit(limit);

      const response = await request.get();

      // console.log(response)
      let collectionResult = [];
      if (!response.empty) {
        response.forEach(doc => { collectionResult.push(doc.data())})
      }
      // console.log(collectionResult);

      return collectionResult;
    } catch (error) { console.log(error); }
  });

  return { data, mutate, isLoading: !data && !error, hasError: error };
}

const useCollectionCursor = options => {
  const key = JSON.stringify(options);
  const [entries, setEntries] = useState(8);
  const [pageNumber, setPageNumber] = useState(0)
  const [lastEntry, setLastEntry] = useState("");

  const { data, error, mutate } = useSWR(key, async (key) => {
    const { collection, orderBy = null, ascending = null } = JSON.parse(key);

    try {
      const collectionRef = db().collection(collection);
      const metadataRef = db().collection("metadata").doc(collection);

      let request = collectionRef;

      if (orderBy) request.orderBy(orderBy, ascending ? "asc" : "desc");

      request = lastEntry != "" ? request.startAfter(lastEntry) : request;

      if (entries) request.limit(entries);

      const snapshotResult = await request.get();
      const metadataResult = await metadataRef.get();

      let pageResults = [];

      if (!snapshotResult.empty) {
        snapshotResult.forEach(doc => { pageResults.push(doc.data()) });
      }

      return {
        entries: pageResults,
        total: metadataResult.exists ? metadataResult.data().entries : null
      }

    } catch (error) {
      console.log(error)
    }
  });

  useEffect(() => {
    pageNumber == 0 ? setLastEntry("") : setLastEntry(data[data.length - 1].id);
  }, [pageNumber]);

  const nextPage = () => {
    if (hasNext()) { setPageNumber(pageNumber + 1); }
  }

  const previousPage = () => {
    if (hasPrevious()) { setPageNumber(pageNumber - 1); }
  }
  const getTotalPages = () => data.total

  const hasNext = () => pageNumber + 1 < Math.ceil(data.total / entries);
  const hasPrevious = () => pageNumber != 0;

  return {
    data: data ? data.entries: null,
    page: {
      totalPages: getTotalPages,
      pageNumber,
      nextPage,
      previousPage,
      hasNext,
      hasPrevious,
      entriesPerPage: entries,
      setEntriesPerPage: (int) => setEntries(parseInt(int, 10)),

    },
    mutate,
    isLoading: !data && !error,
    hasError: error };
}

export { useDocument, useCollection, useQueryCollection, useCollectionCursor };
