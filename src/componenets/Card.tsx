import "../styles/Card.css";

interface CardProps {
  title: string;
  logo: string;
}

export default function CategoryCard({ title, logo }: CardProps) {
  return (
    <div className="Card">
      <img src={logo} alt="image logo"></img>
      <label>{title}</label>
    </div>
  );
}
