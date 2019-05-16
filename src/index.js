import React from "react";
import ReactDOM from "react-dom";

// super must be called to pull props from React.Component
// we use null when we know its an unknown number!
// changing state will trigger a re-render of the component
// only setState can be used to change state



class App extends React.Component{
    //****************initializing state using constructor*************** */
    // constructor(props){
    //     super(props);
    //     // THIS IS THE ONLY TIME DIRECT ASSIGNMENT  OF this.state !!!
    //     this.state = { lat: null, errorMessage: '' };   
    // }

//***************** */ ALTERNATE STATE INITIALIZATION **********************

 state = {lat: null, errorMessage : ''};


        componentDidMount(){
            // the work or get function is NEVER in the render method to avoid double or perpetually calling
            // this async stuff below can also go into the constructor but it is not advised.
        window.navigator.geolocation.getCurrentPosition(
            position => {
                //we called setState - this takes the new and replaces the old triggering the rerender
                this.setState ({lat: position.coords.latitude });

                // IMPORTANT !!! notice how we did NOT do 
                // this.state.lat = position.coords.latitude
            },
            err => {
                this.setState ({ errorMessage: err.message});
            }
          );
        }

    //React says you MUST define render
    render(){
        if ( this.state.errorMessage && !this.state.lat){
            return (<div>Error: {this.state.errorMessage}</div>);
        }
        else if (this.state.lat && !this.state.errorMessage){
            return (<div>
                Latitude:{this.state.lat}
            </div>
            );
        }
        else {
            return (<div>Loading...</div>)
        }

        
    }
   
}

ReactDOM.render(<App />, document.querySelector("#root"));
