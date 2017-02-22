var RecordForm = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      date: '',
      amount: ''
    }
  },
  handleChange: function(event) {
    var name = event.target.name;
    var obj = {};
    obj[name] = event.target.value;
    this.setState(obj);
  },
  valid: function() {
    return (this.state.title && this.state.date && this.state.amount)
  },
  render: function() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" placeholder='Date' name='date'
            value={this.state.date} onChange={this.handleChange}></input>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder='Title' name='title'
            value={this.state.title} onChange={this.handleChange}></input>
        </div>
        <div className="form-group">
          <input type="number" className="form-control" placeholder='Amount' name='amount'
            value={this.state.amount} onChange={this.handleChange}></input>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    )
  }
})
