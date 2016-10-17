import style from "./style.css";
import Ellipsis from "components/Ellipsis";

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
    const {volumeInfo} = book;
    const {title, description, authors, buyLink, imageLinks} = volumeInfo;
    const {thumbnail} = imageLinks;
    log(JSON.stringify(book, null, 2));

    return (
      <div className={style.root}>
        {thumbnail &&
          <a href={buyLink}><img src={thumbnail}/></a>
        }

        {authors &&
          <h4>by {authors.join(", ")}</h4>
        }

        {buyLink &&
          <a href={buyLink}>Purchase on Google Play</a>
        }

        {description &&
          <p><Ellipsis clamp={3} open={true} onExpand={this.handleDetailsExpand}>{description}</Ellipsis></p>
        }
      </div>
    );
  }
}
