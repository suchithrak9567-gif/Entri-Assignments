import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import col from "react-bootstrap/Col";
function MovieCard({handleBookMovie,id, name, image }) {
  return (
    <col key={id}>
    <Card >
      <Card.Img
        variant="top"
        src={image.medium}
        
      />

      <Card.Body>
        <Card.Title>{name}</Card.Title>

        <Card.Text>
        </Card.Text>

        <Button variant="danger" onClick={()=>handleBookMovie({id,name,image:img})}>
         Book Now
        </Button>
      </Card.Body>
    </Card>
    </col>
  );
}

export default MovieCard;