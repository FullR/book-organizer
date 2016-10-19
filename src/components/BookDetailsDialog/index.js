import {React, Component} from "component";
import {inject} from "mobx-react";
import Drawer from "material-ui/Drawer";
import FlatButton from "material-ui/FlatButton";
import AddIcon from "material-ui/svg-icons/content/add";
import RemoveIcon from "material-ui/svg-icons/content/remove";
import BookDetails from "components/BookDetails";
import style from "./style.css";

@inject("ui", "library", "wishlist")
export default class BookDetailsDialog extends Component {
  handleClose = () => this.props.ui.closeBookDialog();

  handleAddToLibrary = () => {
    const {library, ui} = this.props;
    library.toggleBook(ui.bookDialogBook);
  };

  handleAddToWishlist = () => {
    const {wishlist, ui} = this.props;
    wishlist.toggleBook(ui.bookDialogBook);
  };

  render() {
    const {ui, library, wishlist} = this.props;
    const {bookDialogOpen, bookDialogBook} = ui;
    const title = bookDialogBook ? bookDialogBook.volumeInfo.title : "";
    const isInLibrary = library.hasBook(bookDialogBook);
    const isInWishlist = wishlist.hasBook(bookDialogBook);

    return (
      <Drawer
        className={style.root}
        open={bookDialogOpen}
        onRequestChange={this.handleClose}
        docked={false}
        width={window.innerWidth * 0.8}
      >
        <div className={style.children}>
          <div className={style.content}>
            <BookDetails book={bookDialogBook}/>
          </div>
          <div className={style.buttons}>
            <FlatButton
              label="Library"
              primary={isInLibrary}
              onTouchTap={this.handleAddToLibrary}
              icon={isInLibrary ? <RemoveIcon/> : <AddIcon/>}
            />
            <FlatButton
              label="Wishlist"
              primary={isInWishlist}
              onTouchTap={this.handleAddToWishlist}
              icon={isInWishlist ? <RemoveIcon/> : <AddIcon/>}
            />
          </div>
        </div>
      </Drawer>
    );
  }
}
