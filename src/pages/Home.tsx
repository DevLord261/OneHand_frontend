import ToolBar from "../componenets/ToolBar";
import Hero from "../assets/Hero.jpg";
import "../styles/Home.css";
import CategoryCard from "../componenets/Card";
import Medical from "../assets/medical.svg";

function Home() {
  return (
    <>
      <div className="mainhome">
        <ToolBar />
        <div className="herosection">
          <div className="textbox">
            <label className="maintext">
              "A Helping Hand for a Better Tomorrow"
            </label>
            <label className="alttext">
              Fund projects, donate tools, or volunteer your skills. Let’s build
              a brighter future, together.
            </label>
            <button>Start Campaign</button>
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
              <CategoryCard title="Meidcal" logo={Medical} />
              <CategoryCard title="Meidcal" logo={Medical} />
              <CategoryCard title="Meidcal" logo={Medical} />
            </div>
            <div className="row2">
              <CategoryCard title="Meidcal" logo={Medical} />
              <CategoryCard title="Meidcal" logo={Medical} />
              <CategoryCard title="Meidcal" logo={Medical} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
