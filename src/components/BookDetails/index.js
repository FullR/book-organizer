import {React, Component} from "component";
import style from "./style.css";

export default class BookDetails extends Component {
  render() {
    const {book} = this.props;
    if(!book) return null;
    const {volumeInfo, searchInfo} = book;
    const {title, description, authors, buyLink, imageLinks} = volumeInfo;
    const thumbnail = imageLinks && imageLinks.thumbnail;

    return (
      <div className={style.root}>
        {title &&
          <h2 className={style.title}>{title}</h2>
        }

        {thumbnail &&
          <div className={style.thumbnailContainer}>
            <a href={buyLink} target="_blank"><img src={thumbnail}/></a>
          </div>
        }

        {authors &&
          <h4>by {authors.join(", ")}</h4>
        }

        {buyLink &&
          <a href={buyLink}>Purchase on Google Play</a>
        }

        {description &&
          <p>{description}</p>
        }
      </div>
    );
  }
}
