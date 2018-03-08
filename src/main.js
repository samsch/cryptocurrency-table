import 'babel-polyfill';
import 'whatwg-fetch';
import preact from 'preact';
// import './style.scss';

const errorLog = (...e) => {
  if (window.console && window.console.log) {
    window.console.log(...e);
  }
};

const aget = url =>
  fetch(url, {}).then(res => {
    return res.json().then(data => ({ data, res }));
  });

class App extends preact.Component {
  constructor(props) {
    super(props);
    this.state.currencies = {
      'BTC-USD': {
        name: 'BTC',
        price: '',
        volume: '',
      },
      'BCH-USD': {
        name: 'BCH',
        price: '',
        volume: '',
      },
      'ETH-USD': {
        name: 'ETH',
        price: '',
        volume: '',
      },
      'LTC-USD': {
        name: 'LTC',
        price: '',
        volume: '',
      },
    };
    this.list = ['BTC-USD', 'BCH-USD', 'ETH-USD', 'LTC-USD'];
  }
  componentDidMount() {
    const loadData = () => {
      return Promise.all(
        this.list.map(id => {
          return aget(`https://api.gdax.com/products/${id}/ticker`)
            .then(({ res, data }) => {
              if (res.status !== 200) {
                this.setState(prev => {
                  return {
                    currencies: Object.assign({}, prev.currencies, {
                      [id]: Object.assign({}, prev.currencies[id], {
                        error: true,
                      }),
                    }),
                  };
                });
                return;
              }
              this.setState(prev => {
                return {
                  currencies: Object.assign({}, prev.currencies, {
                    [id]: Object.assign({}, prev.currencies[id], {
                      price: data.price,
                      volume: data.volume,
                      error: false,
                    }),
                  }),
                };
              });
            })
            .catch(errorLog);
        })
      ).then(() => {
        this.timer = setTimeout(() => {
          loadData();
        }, 2000);
      });
    };
    loadData();
  }
  componentWillUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }
  render(props, state) {
    if (props.error || state.error) {
      return <p>Data unavailable. Please visit later.</p>;
    }
    errorLog(state);
    return (
      <div>
        <table className="wikitable">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Price</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {this.list.map(id => {
              const currency = this.state.currencies[id];
              if (currency.error) {
                return (
                  <tr>
                    <td>{currency.name}</td>
                    <td>Data unavailable. Please visit later.</td>
                  </tr>
                );
              }
              return (
                <tr>
                  <td>{currency.name}</td>
                  <td>${currency.price}</td>
                  <td>${currency.volume * currency.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const appRootElement = document.getElementById('cryptocurrency-ticker-root');

appRootElement.innerHTML = '';

preact.render(<App />, appRootElement);
