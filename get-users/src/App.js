import { Component } from 'react';
import './App.css';
const dealy = time => new Promise(resolve => setTimeout(resolve, time));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
    };
  }
  async getUsers() {
    this.setState({ users: [], loading: true });
    const users = (await (await fetch('https://reqres.in/api/users?page=1')).json()).data;
    await dealy(1000);
    this.setState({ users, loading: false });
  }
  render() {
    return (
      <div className="app">
        <nav>
          <div className="title">Let's More More Internship</div>
          <button onClick={() => this.getUsers()} className="btn push">
            Get Users
          </button>
        </nav>
        <div className="users">
          {this.state.users.map(user => (
            <div>
              <div className="avatar">
                <img src={user.avatar} alt={user.first_name} />
              </div>
              <div className="info">
                <div className="name">{user.first_name + ' ' + user.last_name}</div>
                <div className="email">{user.email}</div>
              </div>
            </div>
          ))}
        </div>
        {this.state.loading && (
          <div className="loading">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
