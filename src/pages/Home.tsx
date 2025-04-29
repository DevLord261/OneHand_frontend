import ToolBar from "../componenets/ToolBar";
import Hero from "../assets/Hero.jpg";
import "../styles/Home.css";
import CategoryCard from "../componenets/Card";
import categoryimage from "../model/categoryimage";

function Home() {
  const categories = [
    { title: "Medical", key: "medical" },
    { title: "business", key: "business" },
    { title: "Design", key: "design" },
    { title: "Restoring", key: "restore" },
    { title: "School", key: "school" },
    { title: "Technology", key: "technology" },
  ];

  const half = Math.ceil(categories.length / 2);
  const firsthalf = categories.slice(0, half);
  const secondhalf = categories.slice(half);
  return (
    <>
      <div className="mainhome">
        {/* <ToolBar /> */}
        <div className="herosection">
          <div className="textbox">
            <label className="maintext">
              A Helping Hand for a Better Tomorrow
            </label>
            <label className="alttext">
              Launch a fundraiser to support the causes you care about.
            </label>
            <button>Start a Campaign</button>
          </div>
          <img src={Hero} alt="Hero logo"></img>
        </div>
        <div className="categoriesSection">
          <div id="maintext">
            <label id="title">Which category interest you</label>
            <label id="header1">Top Categories</label>
            <label id="body">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the when an unknown was popularise
            </label>
          </div>
          <div className="categories">
            <div className="row1">
              {firsthalf.map((cat) => (
                <CategoryCard
                  key={cat.key}
                  title={cat.title}
                  logo={categoryimage[cat.key]}
                />
              ))}
            </div>
            <div className="row2">
              {secondhalf.map((cat) => (
                <CategoryCard
                  key={cat.key}
                  title={cat.title}
                  logo={categoryimage[cat.key]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
