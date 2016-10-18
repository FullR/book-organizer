import style from "./style.css";
import {ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import store from "store";

export default class BookListItem extends Component {
  render() {
    const {book, maxDescriptionLength=300} = this.props;
    const {title="", description="", subtitle, imageLinks} = book.volumeInfo;
    const smallThumbnail = imageLinks && imageLinks.smallThumbnail;

    return (
      <ListItem
        leftAvatar={<Avatar src={smallThumbnail}/>}
        onTouchTap={() => store.ui.openBookDialog(book)}
        primaryText={subtitle ? `${title} ${subtitle}` : title}
        secondaryText={description}
        secondaryTextLines={2}
      />
    );
  }
}
