//Do not require react because it will override react-rails gem

var Records = React.createClass({
  getInitialState: function() {
    return {
      records: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      records: []
    }
  },
  addRecord: function (record) {
    records = this.state.records.slice()
    records.push(record)
    this.setState({records:records})
//     addRecord: (record) ->
//   records = @state.records.slice()
//   records.push record
//   @setState records: records
// render: ->
//   React.DOM.div
//     className: 'records'
//     React.DOM.h2
//       className: 'title'
//       'Records'
//     React.createElement RecordForm, handleNewRecord: @addRecord
//     React.DOM.hr null
  },
  gained: function() {
    var gained = this.state.records.filter(function(val) {
          return val.amount >= 0
        });
    return gained.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
      }, 0)
  },
  spent: function() {
    var spent = this.state.records.filter(function(val) {
          return val.amount < 0
        });
    return spent.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
      }, 0)
  },
  balance: function() {
    return this.spent() + this.gained()
  },
  render: function() {
    return (
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          <AmountBox type="success" text="Gained" amount={this.gained()}/>
          <AmountBox type="danger" text="Spent" amount={this.spent()}/>
          <AmountBox type="info" text="Balance" amount={this.balance()}/>
        </div>
        <RecordForm handleNewRecord={this.addRecord} />
        <br/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(function(record) {
                   return <Record key={record.id} record={record}/>
                  }.bind(this)
                )
              }
          </tbody>
        </table>
      </div>
    );
  }
});
