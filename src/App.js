import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)

        this.apiUrl = "/contact"

        this.state = {
            busy: false,
            success: false,
            error: false
        }

        this.toggleButton = this.toggleButton.bind(this)
    }

    handleChange(e, field){

        this.setState({
            data: {
                ...this.state.data,
                [field]: e.currentTarget.value
            }
        })
    }

    toggleButton(){
      this.btnSend.disabled = !this.btnSend.disabled
    }


    sendForm(e){

      e.preventDefault()
      this.toggleButton()

      this.setState({
          busy: true,
          error: false
      })


        axios.post(this.apiUrl, this.state.data)
            .then(res =>{
              if(res.status === 200){
                  this.setState({
                      busy: false,
                      error: false,
                      success: true
                  })
              }
            })
            .catch(err => {
                console.error(err)
                this.setState({
                    busy: false,
                    error:true,
                    success: false
                })

                this.toggleButton()
            })
    }

    render() {
      return (
        <div className="App">
           <form onSubmit={this.sendForm.bind(this)}>
               <input type="text" placeholder="Name" value={this.props.name} onChange={(e)=>{this.handleChange(e, 'name')}} required/>
               <input type="email" placeholder="Email" value={this.props.email} onChange={(e)=>{this.handleChange(e, 'email')}} required/>
               <input type="phone" placeholder="Phone" value={this.props.phone} onChange={(e)=>{this.handleChange(e, 'phone')}}/>
               <textarea rows="6" placeholder="Write your message here..." value={this.props.message} onChange={(e)=>{this.handleChange(e, 'message')}} required/>


               <button ref={(e)=>{this.btnSend = e}}>
                   {this.state.busy && <span><img src="./images/busy.svg"/></span>}
                   {this.state.success && <span><img src="./images/done.svg"/></span>}
                   Send
               </button>


               {this.state.error &&
               <span className="error">Oops that didn't work! Please try again.</span>}

           </form>
        </div>
      );
    }
}

export default App;
