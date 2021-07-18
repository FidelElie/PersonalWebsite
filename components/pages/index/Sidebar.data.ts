type sidebarPointProps = {
  title: string,
  points: {
    text: string,
    subPoints: { text: string, alternate?: boolean }[]
  }[]
}

const sidebarPoints: sidebarPointProps[] = [
  {
    title: "Education",
    points: [
      {
        text: "Computational Physics",
        subPoints: [
          { text: "Bachelors Degree", alternate: true },
          { text: "The University Of Edinburgh (UOE)" },
          { text: "2015 - 2019" }
        ]
      },
      {
        text: "4 A Levels",
        subPoints: [
          { text: "Maths, Further Maths, Chemistry, Physics", alternate: true },
          { text: "Saint Marylebone CofE School" },
          { text: "2013 - 2015" }
        ]
      }
    ]
  },
  {
    title: "Activities",
    points: [
      {
        text: "UOE Hip Hop Society",
        subPoints: [{ text: "President" }]
      },
      {
        text: "IBM Business Challenge",
        subPoints: [{ text: "Participant - 3rd Place" }]
      },
      {
        text: "National Citizens Service",
        subPoints: [{ text: "Volunteering - Top Team" }]
      },
      {
        text: "Imperial Space Challenge",
        subPoints: [{ text: "Participant - Runners Up" }]
      },
    ]
  },
  {
    title: "Languages",
    points: [
      {
        text: "English",
        subPoints: [{ text: "Native" }]
      },
      {
        text: "French",
        subPoints: [{ text: "Basic" }]
      },
    ]
  },
  {
    title: "Interests",
    points: [
      {
        text: "Running",
        subPoints: [{ text: "Clubs - Sixth Form, University "}]
      },
      {
        text: "Swimming",
        subPoints: [{ text: "Previously A Lifeguard "}]
      },
      {
        text: "Baking",
        subPoints: [{ text: "Cakes, Cookies, Cheesecakes" }]
      },
      {
        text: "Photography",
        subPoints: [{ text: "Instagram" }]
      },
      {
        text: "Exercise",
        subPoints: [{ text: "Boxing, Skipping, Weight Lifting" }]
      }
    ]
  }
]

export default sidebarPoints;
export type { sidebarPointProps }
