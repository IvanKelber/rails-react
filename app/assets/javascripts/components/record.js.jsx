var Record = React.createClass({
  getInitialState: function() {
    return {
      edit: false,
    }
  },
  handleToggle: function(event) {
    event.preventDefault()
    this.setState({edit: !this.state.edit})
  },
  handleDelete: function(event) {
    event.preventDefault()
    $.ajax({
      method:"DELETE",
      url:"/records/" + this.props.record.id,
      dataType:"JSON",
      success: function() {
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this) //need to use bind to give the appropriate context to this anonymous function
    });
  },
  handleEdit: function(event) {
    event.preventDefault()
    var data = {
        title: ReactDOM.findDOMNode(this.refs.title).value,
        date: ReactDOM.findDOMNode(this.refs.date).value,
        amount: ReactDOM.findDOMNode(this.refs.amount).value,
        id: this.props.record.id
      }
    $.ajax({
      method:"PATCH",
      url:"/records/" + this.props.record.id,
      dataType: "JSON",
      data: {
        record: data
      },
      success: function() {
        this.props.handleUpdateRecord(this.props.record,data);
        this.setState({edit:false});
      }.bind(this)
    });
  },
  recordRow: function() {
    return(
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <button className="btn btn-default" onClick={this.handleToggle}>Edit</button>
          <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    );
  },
  recordForm: function() {
    return(
      <tr>
        <td>
          <input className="form-control" type="text" defaultValue={this.props.record.date} ref="date"/>
        </td>
        <td>
          <input className="form-control" type="text" defaultValue={this.props.record.title} ref="title"/>
        </td>
        <td>
          <input className="form-control" type="number" defaultValue={this.props.record.amount} ref="amount"/>
        </td>
        <td>
          <button className="btn btn-default" onClick={this.handleEdit}>Update</button>
          <button className="btn btn-danger" onClick={this.handleToggle}>Cancel</button>
        </td>
      </tr>
    );
  },
  render: function() {
    if (this.state.edit) {
      return this.recordForm()
    } else {
      return this.recordRow()
    }
  }
})
