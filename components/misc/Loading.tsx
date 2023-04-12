
type props = {
  message?: string
}

const Loading = (props: props) => {
  const { message } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-7xl text-primary opacity-90">
        <i className="fas fa-spinner fa-spin" />
      </span>
      { message && <span className="text-primary mt-5">{ message }</span> }
    </div>
  )
}

export default Loading;
