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

function bookListItemMenu({actions, book}) {
  if(!actions || !actions.length) return null;
  // actions may depend on the individual book
  if(typeof actions === "function") {
    actions = actions(book);
  }

  return (
    <IconMenu iconButtonElement={iconButtonElement}>
      {actions.map(({text, action}) =>
        <MenuItem key={text} onTouchTap={action ? () => action(book) : null}>{text}</MenuItem>
      )}
    </IconMenu>
  );
}

@inject("ui", "bookListManager")
export default class BookListItem extends Component {
  handleTouchTap = (event) => {
    const {ui, book} = this.props;
    ui.openBookDialog(book);
  };

  render() {
    const {ui, actions, book, maxDescriptionLength=300} = this.props;
    const {title="", description="", subtitle, imageLinks} = book.volumeInfo;
    const smallThumbnail = imageLinks && imageLinks.smallThumbnail;

    return (
      <ListItem
        leftAvatar={<Avatar src={smallThumbnail}/>}
        rightIconButton={bookListItemMenu({actions, book})}
        onTouchTap={this.handleTouchTap}
        primaryText={subtitle ? `${title} ${subtitle}` : title}
        secondaryText={description}
        secondaryTextLines={2}
      />
    );
  }
}
