// //  @AmountBox = React.createClass
//     render: ->
//       React.DOM.div
//         className: 'col-md-4'
//         React.DOM.div
//           className: "panel panel-#{ @props.type }"
//           React.DOM.div
//             className: 'panel-heading'
//             @props.text
//           React.DOM.div
//             className: 'panel-body'
//             amountFormat(@props.amount)

var AmountBox = React.createClass({
  render: function() {
    return (
      <div className="col-md-4">
        <div className={"panel panel-"+this.props.type}>
          <div className="panel-heading">
            {this.props.text}
          </div>
          <div className="panel-body">
            {amountFormat(this.props.amount)}
          </div>
        </div>
      </div>
    )
  }
})
