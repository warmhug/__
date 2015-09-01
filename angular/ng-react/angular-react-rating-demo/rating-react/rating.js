/** @jsx React.DOM */

var FundooRating = React.createClass({
  render: function() {
    var items = [];
    for (var i = 1; i <= this.props.max; i++) {
      var clickHandler = this.props.onRatingSelected && this.props.onRatingSelected.bind(null, i);
      items.push(<li class={i <= this.props.value && 'filled'} onClick={clickHandler}>{'\u2605'}</li>);
    }
    return <ul class="rating">{items}</ul>;
  }
});

var FundooDirectiveTutorial = React.createClass({
  getInitialState: function() {
    return {rating: 5};
  },
  handleRatingSelected: React.autoBind(function(rating) {
    this.setState({rating: rating});
    alert('Rating selected - ' + rating);
  }),
  render: function() {
    return (
      <div>
        Rating is {this.state.rating}<br/>
        Clickable Rating <br/>
        <FundooRating value={this.state.rating} max="10" onRatingSelected={this.handleRatingSelected} />
        <br />
        Readonly rating <br/>
        <FundooRating value={this.state.rating} max="10" />
      </div>
    );
  }
});

React.renderComponent(<FundooDirectiveTutorial />, document.body);