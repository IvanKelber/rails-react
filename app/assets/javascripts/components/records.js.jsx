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
    records = React.addons.update(this.state.records, { $push: [record] })
    this.replaceState({ records: records});
  },
  deleteRecord: function(record) {
    var index = this.state.records.indexOf(record)
    records = React.addons.update(this.state.records, { $splice: [[index,1]] })
    this.replaceState({ records: records});
  },
  updateRecord: function(record,data) {
    var index = this.state.records.indexOf(record)
    records = React.addons.update(this.state.records,{$splice:[[index,1,data]]})
    this.replaceState({ records: records});
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(function(record) {
                console.log("record: " + record.id + " " + record.title);
                   return <Record key={record.id} record={record}
                     handleDeleteRecord={this.deleteRecord}
                     handleUpdateRecord={this.updateRecord}/>
                  }.bind(this)
                )
              }
          </tbody>
        </table>
      </div>
    );
  }
});
