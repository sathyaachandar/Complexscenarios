import { LightningElement, track } from 'lwc';
import createRefreshAccessToken from '@salesforce/apex/GoogleCalendarAPICallout.createRefreshAccessToken';
export default class CreateAnGoogleCalendarEvent extends LightningElement {
    authMessage = ''; // To store the authorization message

    connectedCallback() {
        // Parse the URL for 'code' or 'error' parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (code) {
            console.log('The code is: ' + code);
            this.authMessage = `Authorization Code: ${code}`;
            alert(`Authorization Code: ${code}`);
            // Optionally, send this code to the Apex controller for token exchange
        } else if (error) {
            this.authMessage = `Authorization Error: ${error}`;
            alert(`Authorization Error: ${error}`);
        } else {
            this.authMessage = 'No authorization code or error found.';
            console.log('There is no code niether an error found.');
        }
    }

    @track summary = '';
    @track description = '';
    @track attendeeEmail = '';
    @track attendees = [];
    @track startDateTime = '';
    @track endDateTime = '';
    @track timeZone = 'America/New_York';

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    addAttendee() {
        if (this.attendeeEmail) {
            // Add the attendee email to the list if it's not empty
            this.attendees.push({ email: this.attendeeEmail });
            this.attendeeEmail = ''; // Clear the input field
        }
    }
    handleSubmit(){s
        createRefreshAccessToken({
            summary: this.summary,
            description: this.description,
            attendees: JSON.stringify(this.attendees),
            startDateTime: this.startDateTime,
            endDateTime: this.endDateTime,
            timeZone: this.timeZone,
        }).then(result => {
                console.log('result: '+result);
                alert('Event Created Successfully');
        }).catch((error) => {
            console.log('error: '+error);
            alert('Event Creation Failed');
        });

    }
}
