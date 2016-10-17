import style from "./style.css";
import {ListItem} from "material-ui/List";
import store from "store";

export default class BookListItem extends Component {
  render() {
    const {book} = this.props;
    const {title="", subtitle} = book.volumeInfo;

    return (
      <ListItem
        onTouchTap={() => store.ui.openBookDialog(book)}
        primaryText={subtitle ? `${title} ${subtitle}` : title}
      />
    );
  }
}
