import {React, Component} from "component";
import style from "./style.css";

export default class BookDetails extends Component {
  state = {detailsExpanded: false};
  handleDetailsExpand = () => this.setState({detailsExpanded: true});

  componentWillReceiveProps(nextProps) {
    if(nextProps.book !== this.props.books) {
      this.setState({detailsExpanded: false});
    }
  }

  render() {
    const {book} = this.props;
    if(!book) return null;
    const {detailsExpanded} = this.state;
    const {volumeInfo, searchInfo} = book;
    const {title, description, authors, buyLink, imageLinks} = volumeInfo;
    const thumbnail = imageLinks && imageLinks.thumbnail;

    log(require("mobx").toJS(book))

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
