# VIER Cognitive Voice Gateway

Enable phone bots with VIER Cognitive Voice Gateway (CVG) and integration in various contact centers.

This extension needs 
* an account at VIER Cognitive Voice Gateway (in case you need an account please contact support@vier.ai)
* a link between the project in  CVG and the endpoint in Cognigy to be set up in CVG.

See https://cognitivevoice.io/docs/conversational-ai/conversational-ai-cognigy.html for further information.

Please note that [CVG sends events to Cognigy](https://cognitivevoice.io/docs/conversational-ai/conversational-ai-cognigy.html#from-cvg-to-cognigy-events) that needs to be handled by your flow. Some of the nodes below initiate the generation of such events.

## Node: Speak (with SSML formatting)

> The bot says the given text. SSML formatting is supported with a simple editor.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Text*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The text to be synthesized and played to the caller. To insert SSML tags mark the text and use the commands of the editor (Emphasize, Pause, Structure, Say as, Speech Rate, Speech Volume, Speech Pitch, Phoneme, Audio, Voice) </td>
			<td style="border: 1px solid #ddd; padding: 8px;">Your contract &lt;say-as interpret-as=&quot;characters&quot;&gt;{{context.contractno}}&lt;/say-as&gt; is beeing updated. &lt;break time=&quot;300ms&quot;&gt;Thank you.</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the caller to interrupt the bot output by speaking</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the talking bot can be interrupted by the speaker</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the caller to interrupt the bot output by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the talking bot can be interrupted by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
	</tbody>
</table>

## Node: Start Recording

> Starts or resumes a recording of a call. You can record the caller, the agent (bot), or both. If you record both lines, you will get a stereo recording.

### Arguments
<table style="border-collapse: collapse;">
  <thead>
    <tr style="text-align: left;">
      <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Maximum Recording Duration</td>
      <td style="border: 1px solid #ddd; padding: 8px;">The duration in seconds after which the recording will be <b>stopped</b>. Leaving this field empty, the recording will not be stopped automatically. For this purpose use the <b>Stop Recording</b> node.</td>
      <td style="border: 1px solid #ddd; padding: 8px;">60 (<i>for 60 seconds</i>)</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Recording ID</td>
      <td style="border: 1px solid #ddd; padding: 8px;">An arbitrary string to identify the recording in case multiple recordings are created in the same dialog. By leaving this field empty, the default value default will be used.</td>
      <td style="border: 1px solid #ddd; padding: 8px;">survey recording</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Speakers to record</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Choose if you want to record both lines (Customer & Agent) or only one of both lines</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Both Lines</td>
    </tr>
  </tbody>
</table>

## Node: Stop Recording

> Pauses or stops recording a call.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Recording ID</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The ID used to start a recording. If left empty the default value <i>default</i> will be used.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">survey recording</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Terminate Recording</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the recording will be terminated rather than paused</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
	</tbody>
</table>

## Node: Play Audio File

> Plays an audio file to the call. 

Note the following requirements and limitations:

* The audio file must be hosted at an Internet-accessible HTTP(S) endpoint. In case of HTTPS the server hosting the audio file must present a valid, trusted SSL certificate. Self-signed certificates cannot be used.
* The audio file must be a valid wav file (waveform audio file format).
* The file format must be one of the following:
* Linear PCM with signed 16 bits per sample, with a sample rate of 8000 Hz or 16000 Hz
* A-law with a sample rate of 8000 Hz
* µ-law with a sample rate of 8000 Hz

The  audio file is subject to caching, which means repeated use of the same URL *might* not lead to repeated requests to the audio file. These standard caching headers will be respected/sent: `Cache-Control`, `Expires`, `Last-Modified` and `ETag`. Note that caching is not guaranteed to happen and the systems delivering the audio files should be prepared to handle the load for each individual play operation being made.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Audio URL*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The URL of the audio file</td>
			<td style="border: 1px solid #ddd; padding: 8px;">https://example.com/audio/prerecorded.wav</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the speaker to interrupt the audio file by speaking</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the playing of the audio file can be interrupted by the speaker</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the caller to interrupt the audio file by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the playing of the audio file can be interrupted by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Fallback text</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Text to be announced when the audio file cannot be played.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Welcome at VIER! </td>
		</tr>
	</tbody>
</table>

## Node: Stop Audio Playback

> Stops the audio playback started using the "Play Audio File" node. 

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Audio URL*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The exact URL of the audio file started with the "Play Audio File" node.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">https://example.com/audio/prerecorded.wav</td>
		</tr>
	</tbody>
</table>


## Node: Set Inactivity Timeout

> Start inactivity detection with a specified timeout.

The automatic inactivity timeout in the CVG project settings must be disabled for this feature to be available.


### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Enable or disable the timer</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Check this option to enable the inactivity timer, uncheck it to disable the timer. If checked a timeout (in seconds) has to be entered.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Disabled</td>
		</tr>
	</tbody>
</table>

## Node: Set Speech-to-Text Service

> Sets the Speech-to-Text Service for transcription of voice input

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Language*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The language to be used for Speech-to-Text</td>
			<td style="border: 1px solid #ddd; padding: 8px;">de-DE</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Speech-To-Text Service</td>
			<td style="border: 1px solid #ddd; padding: 8px;">One of the following Speech-to-Text Services: 'GOOGLE', 'IBM', 'MICROSOFT' or set a service via profile token.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Microsoft </td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Speech-To-Text Service Fallback</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Fallback if main Speech-to-Text Service is not available. One of the following Speech-to-Text Services: 'GOOGLE', 'IBM', 'MICROSOFT' or set a service via profile token.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Google </td>
		</tr>
	</tbody>
</table>

## Node: Get Number from Caller

> Prompts the user to enter a number. This number needs to be entered via DTMF.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Text*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The text to be synthesized and played to the caller.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Hello!</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Timeout*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The time of silence needed to send an inactivity event to the bot</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>60</i> for 60 seconds</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Language</td>
			<td style="border: 1px solid #ddd; padding: 8px;">A language code different from the projects selected language</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>de-DE</i> or <i>en-US</i></td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Synthesizers</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Define synthesizers that override the synthesizer list from the project settings. When using custom synthesizer profiles attach the profile name after the vendor with a dash</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>GOOGLE</i> or <i>GOOGLE-profilename</i></td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the caller to interrupt the bot output by speaking</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the talking bot can be interrupted by the speaker</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the caller to interrupt the bot output by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the talking bot can be interrupted by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Use Submit Inputs</td>
			<td style="border: 1px solid #ddd; padding: 8px;">One of the two stop conditions to signal the end of the user input</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Submit Inputs</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If <b>Use Submit Inputs</b> has been selected, use this input to define either a Text-To-Speech text or a DTMF signal to end the user input</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>DTMF_#</i> or <i>Done</i></td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Use Max Digits</td>
			<td style="border: 1px solid #ddd; padding: 8px;">One of the two stop conditions to signal the end of the user input</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Maximum Allowed Digits</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If <b>Use Max Digits</b> has been selected, use this input to define a maximum amount of digits a user can enter. The input will end once the limit has been reached</td>
			<td style="border: 1px solid #ddd; padding: 8px;">5</td>
		</tr>
	</tbody>
</table>

## Node: Get Multiple Choice Answer from Caller

> Prompts the user to select one of several choices (e.g. yes/no answers)

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Text*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The text to be synthesized and played to the caller.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Hello!</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Timeout*</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The time of silence needed to send an inactivity event to the bot</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>60</i> for 60 seconds</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Language</td>
			<td style="border: 1px solid #ddd; padding: 8px;">A language code different from the projects selected language</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>de-DE</i> or <i>en-US</i></td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Synthesizers</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Define synthesizers that override the synthesizer list from the project settings. When using custom synthesizer profiles attach the profile name after the vendor with a dash</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>GOOGLE</i> or <i>GOOGLE-profilename</i></td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the caller to interrupt the bot output by speaking</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the talking bot can be interrupted by the speaker</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Allow the caller to interrupt the bot output by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">If checked, the talking bot can be interrupted by pressing keys</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Choices</td>
			<td style="border: 1px solid #ddd; padding: 8px;">A map of key-value pairs that describe the possible answers. Each key describes the topic of the answer whereas the value is an array of strings denoting the possible answers to the respective topic</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>Please refer to the default value provided in the input field of the node</i></td>
		</tr>
	</tbody>
</table>

## Node: Send Data

> Attaches custom data to a dialog. This custom data can be read e.g. after an agent handover.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom Data</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom data that is attached to the dialog</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>Any valid JSON data consisting of key value pairs where the value is a string</i></td>
		</tr>
	</tbody>
</table>

## Node: Forward Call

> Forwards the call to a different destination, e.g. to perform an agent handover.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Destination Phone Number</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The phone number to forward the call to. Must be in +E.164 format or a SIP address.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">+4921123456789 or sip:+4921123456789@sip.cognitivevoice.io</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Displayed Caller ID</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The number to display to the party the call is forwarded to. This is a best-effort feature since we cannot guarantee that all gateways the traffic flows through will retain this information.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">+4921123456789</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Ring Timeout</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The amount of time in seconds to try to call the forwarded number.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">60 for 60 seconds</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Accept Answering Machines</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Wether to talk with answering machines or immediately hang up on them. This is a best-effort feature since this mechanism relies on heuristics to determine of the callee is an answering machine.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom SIP Headers</td>
			<td style="border: 1px solid #ddd; padding: 8px;">SIP headers that can be attached to the request. Headers need to be in the form of <code>[key: string]: [string]</code>. Keys need to be prefixed with a <i>x-</i>. Due to limitations, only <b>128 bytes</b> of data will be accepted. Any SIP proxy on the path to the system, that is supposed to read the information, can alter or drop headers</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><code>{ "x-some-header": ["some", "data"] }</code></td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom Data</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom data that is attached to the dialog</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>Any valid JSON data consisting of key value pairs where the value is a string</i></td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Whispering Announcement</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Text that should be announced to the agent the call is transfered to before the call parties are connected</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Next call: Flight cancelation</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Quit Flow</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Wether the flow should be terminated after this node did execute</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">(EXPERIMENTAL) Enable Ringing Tone</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Enables the playback of a ringing tine while the call is in the process of transferring. This is an experimental feature flag that may be removed in the future!</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
	</tbody>
</table>

## Node: Forward Call to a Contact Center

> Forwards the call to a contact center destination for agent assistance.

The called number is constructed by appending a random n-digit number to `Head Number` (where n ist the `Extension Length`).
After a successful bridge, the bot will not receive further messages and will not be able to send any commands. Recordings will be stopped automatically if there are any running.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Phone Number Prefix</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The base phone number that is used to construct the complete phone number. Needs to be in +E.164 format</td>
			<td style="border: 1px solid #ddd; padding: 8px;">+49721123456</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Extension Length</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The amount of digits generated that is appended to the head number. The resulting phone numbers must be valid (no more than 15 digits)</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Minimum: 0, Maximum: 12, Default: 3</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Displayed Caller ID</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The number to display to the party the call is forwarded to. This is a best-effort feature since we cannot guarantee that all gateways the traffic flows through will retain this information.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">+4921123456789</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Ring Timeout</td>
			<td style="border: 1px solid #ddd; padding: 8px;">The amount of time in seconds to try to call the forwarded number.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">60 for 60 seconds</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Accept Answering Machines</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Wether to talk with answering machines or immediately hang up on them. This is a best-effort feature since this mechanism relies on heuristics to determine of the callee is an answering machine.</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom SIP Headers</td>
			<td style="border: 1px solid #ddd; padding: 8px;">SIP headers that can be attached to the request. Headers need to be in the form of <code>[key: string]: [string]</code>. Keys need to be prefixed with an <i>x-</i>. Due to limitations, only <b>128 bytes</b> of data will be accepted. Any SIP proxy on the path to the system, that is supposed to read the information, can alter or drop headers</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><code>{ "x-some-header": ["some", "data"] }</code></td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom Data</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom data that is attached to the dialog</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>Any valid JSON data consisting of key value pairs where the value is a string</i></td>
		</tr>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Whispering Announcement</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Text that should be announced to the agent the call is transfered to before the call parties are connected</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Next call: Flight cancelation</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Quit Flow</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Wether the flow should be terminated after this node did execute</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">(EXPERIMENTAL) Enable Ringing Tone</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Enables the playback of a ringing tine while the call is in the process of transferring. This is an experimental feature flag that may be removed in the future!</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
	</tbody>
</table>

## Node: Check Call Forwarding Result
 
> Check result after a call has been forwarded. Enables fallback handling if call couldn't be forwarded successfully.

### Arguments
<i>None.</i>

## Node: Terminate Call
 
> Hangs up the call.

### Arguments
<table style="border-collapse: collapse;">
	<thead>
		<tr style="text-align: left;">
			<th style="border: 1px solid #ddd; padding: 8px;">Name</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Description</th>
			<th style="border: 1px solid #ddd; padding: 8px;">Example</th>
		</tr>
	</thead>
	<tbody>
        <tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Quit Flow</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Wether the flow should be terminated after this node did execute</td>
			<td style="border: 1px solid #ddd; padding: 8px;">✔️</td>
		</tr>
		<tr>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom Data</td>
			<td style="border: 1px solid #ddd; padding: 8px;">Custom data that is attached to the dialog</td>
			<td style="border: 1px solid #ddd; padding: 8px;"><i>Any valid JSON data consisting of key value pairs where the value is a string</i></td>
		</tr>
	</tbody>
</table>
