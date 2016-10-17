import style from "./style.css";
import Drawer from "material-ui/Drawer";
import FlatButton from "material-ui/FlatButton";
import AddIcon from "material-ui/svg-icons/content/add";
import RemoveIcon from "material-ui/svg-icons/content/remove";
import BookDetails from "components/BookDetails";

export default class BookDetailsDialog extends Component {
  handleClose = () => this.props.store.ui.closeBookDialog();
  handleAddToLibrary = () => {
    const {store} = this.props;
    const {bookDialogBook} = store;
    log("add", bookDialogBook)
    if(bookDialogBook) {
      store.addToBookList("library", bookDialogBook);
    }
  };

  handleAddToWishlist = () => {
    const {store} = this.props;
    const {bookDialogBook} = store;
    if(bookDialogBook) {
      store.addToBookList("wishlist", bookDialogBook);
    }
  };

  handleRemoveFromLibrary = () => {
    const {store} = this.props;
    const {bookDialogBook} = store;
    log("remove", bookDialogBook);
    if(bookDialogBook) {
      store.removeFromBookList("library", bookDialogBook);
    }
  };

  handleRemoveFromWishlist = () => {
    const {store} = this.props;
    const {bookDialogBook} = store;
    if(bookDialogBook) {
      store.removeFromBookList("wishlist", bookDialogBook);
    }
  };

  render() {
    const {store} = this.props;
    const {bookDialogOpen, bookDialogBook} = store.ui;
    const title = bookDialogBook ? bookDialogBook.volumeInfo.title : "";
    const isInLibrary = bookDialogBook && store.isInBookList("library", bookDialogBook);
    const isInWishlist = bookDialogBook && store.isInBookList("wishlist", bookDialogBook);
    log({isInLibrary, isInWishlist})
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
            <FlatButton primary
              onClick={() => log("touch!")}
              icon={isInLibrary ? <RemoveIcon/> : <AddIcon/>}
            >
            Library
            </FlatButton>
            <FlatButton primary
              onTouchTap={isInWishlist ? this.handleRemoveFromWishlist : this.handleAddToWishlist}
              icon={isInWishlist ? <RemoveIcon/> : <AddIcon/>}
            >
            Wishlist
            </FlatButton>
          </div>
        </div>
      </Drawer>
    );
  }
}
