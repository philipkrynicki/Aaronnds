import { useHistory } from "react-router";

const BoardsAll = () => {

  const history = useHistory();

  const boardClickHandler = () => {
    history.push(`/board/id`);
  }

  return (
    <div className="row">

      <div className="col-md-4">
        <h4 onClick={boardClickHandler}>
          [[ Board 1 ]]
        </h4>
      </div>

      <div className="col-md-4">
        <h4 onClick={boardClickHandler}>
          [[ Board 2 ]]
        </h4>
      </div>

      <div className="col-md-4">
        <h4 onClick={boardClickHandler}>
          [[ Board 3 ]]
        </h4>
      </div>

      <div className="col-md-4">
        <h4 onClick={boardClickHandler}>
          [[ Board 4 ]]
        </h4>
      </div>

      <div className="col-md-4">
        <h4 onClick={boardClickHandler}>
          [[ Board 5 ]]
        </h4>
      </div>

      <div className="col-md-4">
        <h4 className="text-success">
          (~Add Board~)
        </h4>
      </div>

    </div>
  );
}

export default BoardsAll