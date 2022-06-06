// const onSubmit = async event => {
//   event.preventDefault();
//   await dbService.doc(`tweets/${tweet.id}`).update({
//     text: newTweet,
//   });
//   setEditable(false);
// };
// const onChangeTweet = event => {
//   setNewTweet(event.target.value);
// };

{
  /* {editable ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your tweet"
              value={newTweet}
              required
              onChange={onChangeTweet}
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditable}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweet.text}</h4>
          {tweet.fileUrl && (
            <img src={tweet.fileUrl} width="50px" height="50px" alt="" />
          )}
          {isMyTweet && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={toggleEditable}>Edit Tweet</button>
            </>
          )}
        </>
      )} */
}
