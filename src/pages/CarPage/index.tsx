import { useParams } from "react-router-dom";

function CarPage() {
  let { id } = useParams<{ id: string }>();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}

export { CarPage };
