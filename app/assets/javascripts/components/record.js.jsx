var Record = React.createClass({
  handleDelete: function(event) {
    event.preventDefault()
    $.ajax({
      method:"DELETE",
      url:"/records/" + this.props.record.id,
      dataType:"JSON",
      success: function() {
        this.props.handleDeleteRecord(this.props.record)
      }.bind(this) //need to use bind to give the appropriate context to this anonymous function
    })
  },
  render: function() {
    return(
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td><button className="btn btn-danger" onClick={this.handleDelete}>Delete</button></td>
      </tr>
    );
    }
})
