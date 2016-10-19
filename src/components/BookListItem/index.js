import {React, Component} from "component";
import {inject} from "mobx-react";
import {ListItem} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";
import style from "./style.css";

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon/>
  </IconButton>
);

class BookListItemMenu extends Component {
  render() {
    const {actions, book} = this.props;
    if(!actions || !actions.length) return null;

    return (
      <IconMenu iconButtonElement={iconButtonElement}>
        {actions.map(({text, action}) =>
          <MenuItem key={text} onTouchTap={action ? () => action(book) : null}>{text}</MenuItem>
        )}
      </IconMenu>
    );
  }
}

@inject("ui")
export default class BookListItem extends Component {
  render() {
    const {ui, actions, book, maxDescriptionLength=300} = this.props;
    const {title="", description="", subtitle, imageLinks} = book.volumeInfo;
    const smallThumbnail = imageLinks && imageLinks.smallThumbnail;

    return (
      <ListItem
        leftAvatar={<Avatar src={smallThumbnail}/>}
        rightIconButton={<BookListItemMenu actions={actions} book={book}/>}
        onTouchTap={() => ui.openBookDialog(book)}
        primaryText={subtitle ? `${title} ${subtitle}` : title}
        secondaryText={description}
        secondaryTextLines={2}
      />
    );
  }
}
