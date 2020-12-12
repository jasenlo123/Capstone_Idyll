const React = require('react');

const getRandomElement = (items) => {
  items = items || [];
  return items[Math.floor(Math.random()*items.length)];
};

class Quote extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quote: getRandomElement(this.props.quotes)
    }
  }

  updateQuote() {
    this.setState({
      quote: getRandomElement(this.props.quotes)
    });
  }

  initializeInterval() {
    if (this.interval) {
      return;
    }
    this.interval = setInterval(() => {
      this.updateQuote();
    }, 6000);
  }

  formatText(text) {
    return text.replace(/\\n/g, ' ').replace(/{(\$\d+\.?\d*)}/g, '$1').replace(/ ([a-z]?\')/g, '$1');
  }

  render() {
    console.log(Object.values(this.state.quote)[0])
    if (this.props.running) {
      this.initializeInterval();
    }
    return (
      <div className="quote">
        <div className="content">
        <a href= {this.state.quote.Link} target="_blank"> {this.formatText(Object.values(this.state.quote)[0])}</a>
          </div>
        <div className="attribution">
          <span className="person">{this.state.quote.Person}</span><br>
          </br><span className="position">{this.state.quote.Position}</span>
        </div>
      </div>
    );
  }
}

module.exports = Quote;