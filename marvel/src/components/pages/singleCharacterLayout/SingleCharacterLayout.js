import { Helmet } from "react-helmet";
import "./singleCharacterLayout.scss";

const SingleCharacterLayout = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="single-charater">
      <Helmet>
        <meta name="description" content={`${name} marvel character`} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-charater__char-img" />
      <div className="single-charater__info">
        <h2 className="single-charater__name">{name}</h2>
        <p className="single-charater__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleCharacterLayout;
