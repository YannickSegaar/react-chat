const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`

export const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_form' || trace.payload.name === 'ext_form',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="text"], input[type="email"], input[type="tel"], select, textarea {
              width: 100%;
              border: none;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              background: transparent;
              margin: 5px 0;
              outline: none;
            }
            .phone {
              width: 150px;
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
            }
          </style>

          <label for="subject">Subject</label>
          <select class="subject" name="subject" required>
            <option value="" disabled selected></option>
            <option value="Tour Inquiries">Tour Inquiries</option>
            <option value="Booking Assistance">Booking Assistance</option>
            <option value="Special Requests">Special Requests</option>
            <option value="Feedback and Complaints">Feedback and Complaints</option>
          </select><br><br>

          <label for="name">Name</label>
          <input type="text" class="name" name="name" required><br><br>

          <label for="email">Email</label>
          <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Invalid email address"><br><br>

          <label for="phone">Phone Number</label>
          <input type="tel" class="phone" name="phone" required pattern="\\d+" title="Invalid phone number, please enter only numbers"><br><br>

          <label for="notes">Notes</label>
          <textarea class="notes" name="notes"></textarea><br><br>

          <input type="submit" class="submit" value="Submit">
        `

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const subject = formContainer.querySelector('.subject')
      const name = formContainer.querySelector('.name')
      const email = formContainer.querySelector('.email')
      const phone = formContainer.querySelector('.phone')
      const notes = formContainer.querySelector('.notes')

      if (
        !subject.checkValidity() ||
        !name.checkValidity() ||
        !email.checkValidity() ||
        !phone.checkValidity()
      ) {
        subject.classList.add('invalid')
        name.classList.add('invalid')
        email.classList.add('invalid')
        phone.classList.add('invalid')
        return
      }

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          subject: subject.value,
          name: name.value,
          email: email.value,
          phone: phone.value,
          notes: notes.value
        },
      })
    })

    element.appendChild(formContainer)
  },
}

  
  

export const MapExtension = {
  name: 'Maps',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_map' || trace.payload.name === 'ext_map',
  render: ({ trace, element }) => {
    const GoogleMap = document.createElement('iframe')
    const { apiKey, origin, destination, zoom, height, width } = trace.payload

    GoogleMap.width = width || '240'
    GoogleMap.height = height || '240'
    GoogleMap.style.border = '0'
    GoogleMap.loading = 'lazy'
    GoogleMap.allowFullscreen = true
    GoogleMap.src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&zoom=${zoom}`

    element.appendChild(GoogleMap)
  },
}

export const VideoExtension = {
  name: 'Video',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_video' || trace.payload.name === 'ext_video',
  render: ({ trace, element }) => {
    const videoElement = document.createElement('video')
    const { videoURL, autoplay, controls } = trace.payload

    videoElement.width = 250
    videoElement.height = 200
    videoElement.src = videoURL

    if (autoplay) {
      videoElement.setAttribute('autoplay', '')
    }
    if (controls) {
      videoElement.setAttribute('controls', '')
    }

    videoElement.addEventListener('ended', function () {
      window.voiceflow.chat.interact({ type: 'complete' })
    })
    element.appendChild(videoElement)
  },
}

export const TimerExtension = {
  name: 'Timer',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_timer' || trace.payload.name === 'ext_timer',
  render: ({ trace, element }) => {
    const { duration } = trace.payload || 5
    let timeLeft = duration

    const timerContainer = document.createElement('div')
    timerContainer.innerHTML = `<p>Time left: <span id="time">${timeLeft}</span></p>`

    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown)
        window.voiceflow.chat.interact({ type: 'complete' })
      } else {
        timeLeft -= 1
        timerContainer.querySelector('#time').textContent = timeLeft
      }
    }, 1000)

    element.appendChild(timerContainer)
  },
}

export const FileUploadExtension = {
  name: 'FileUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_fileUpload' || trace.payload.name === 'ext_fileUpload',
  render: ({ trace, element }) => {
    const fileUploadContainer = document.createElement('div')
    fileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' style='display: none;'>
    `

    const fileInput = fileUploadContainer.querySelector('input[type=file]')
    const fileUploadBox = fileUploadContainer.querySelector('.my-file-upload')

    fileUploadBox.addEventListener('click', function () {
      fileInput.click()
    })

    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0]
      console.log('File selected:', file)

      fileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

      var data = new FormData()
      data.append('file', file)

      fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Upload failed: ' + response.statusText)
          }
        })
        .then((result) => {
          fileUploadContainer.innerHTML =
            '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
          console.log('File uploaded:', result.data.url)
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: {
              file: result.data.url.replace(
                'https://tmpfiles.org/',
                'https://tmpfiles.org/dl/'
              ),
            },
          })
        })
        .catch((error) => {
          console.error(error)
          fileUploadContainer.innerHTML = '<div>Error during upload</div>'
        })
    })

    element.appendChild(fileUploadContainer)
  },
}

export const KBUploadExtension = {
  name: 'KBUpload',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_KBUpload' || trace.payload.name === 'ext_KBUpload',
  render: ({ trace, element }) => {
    const apiKey = trace.payload.apiKey || null
    const maxChunkSize = trace.payload.maxChunkSize || 1000
    const tags = `tags=${JSON.stringify(trace.payload.tags)}&` || ''
    const overwrite = trace.payload.overwrite || false

    if (apiKey) {
      const kbfileUploadContainer = document.createElement('div')
      kbfileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' accept='.txt,.text,.pdf,.docx' style='display: none;'>
    `

      const fileInput = kbfileUploadContainer.querySelector('input[type=file]')
      const fileUploadBox =
        kbfileUploadContainer.querySelector('.my-file-upload')

      fileUploadBox.addEventListener('click', function () {
        fileInput.click()
      })

      fileInput.addEventListener('change', function () {
        const file = fileInput.files[0]

        kbfileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`

        const formData = new FormData()
        formData.append('file', file)

        fetch(
          `https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload?${tags}overwrite=${overwrite}&maxChunkSize=${maxChunkSize}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              Authorization: apiKey,
            },
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('Upload failed: ' + response.statusText)
              window.voiceflow.chat.interact({
                type: 'error',
                payload: {
                  id: 0,
                },
              })
            }
          })
          .then((result) => {
            kbfileUploadContainer.innerHTML =
              '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">'
            window.voiceflow.chat.interact({
              type: 'complete',
              payload: {
                id: result.data.documentID || 0,
              },
            })
          })
          .catch((error) => {
            console.error(error)
            kbfileUploadContainer.innerHTML = '<div>Error during upload</div>'
          })
      })
      element.appendChild(kbfileUploadContainer)
    }
  },
}

export const DateExtension = {
  name: 'Date',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_date' || trace.payload.name === 'ext_date',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    // Get current date and time
    let currentDate = new Date()
    let minDate = new Date()
    minDate.setMonth(currentDate.getMonth() - 1)
    let maxDate = new Date()
    maxDate.setMonth(currentDate.getMonth() + 2)

    // Convert to ISO string and remove seconds and milliseconds
    let minDateString = minDate.toISOString().slice(0, 16)
    let maxDateString = maxDate.toISOString().slice(0, 16)

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                border: none;
                background: transparent;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                bottom: 0;
                outline: none;
                color: transparent;
                cursor: pointer;
                height: auto;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                width: auto;
                padding:6px;
                font: normal 8px sans-serif;
            }
            .meeting input{
              background: transparent;
              border: none;
              padding: 2px;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              font: normal 14px sans-serif;
              outline:none;
              margin: 5px 0;
              &:focus{outline:none;}
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
              opacity: 0.3;
            }
            .submit:enabled {
              opacity: 1; /* Make the button fully opaque when it's enabled */
            }
          </style>
          <label for="date">Select your date/time</label><br>
          <div class="meeting"><input type="datetime-local" id="meeting" name="meeting" value="" min="${minDateString}" max="${maxDateString}" /></div><br>
          <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
          `

    const submitButton = formContainer.querySelector('#submit')
    const datetimeInput = formContainer.querySelector('#meeting')

    datetimeInput.addEventListener('input', function () {
      if (this.value) {
        submitButton.disabled = false
      } else {
        submitButton.disabled = true
      }
    })
    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const datetime = datetimeInput.value
      console.log(datetime)
      let [date, time] = datetime.split('T')

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: { date: date, time: time },
      })
    })
    element.appendChild(formContainer)
  },
}

export const ConfettiExtension = {
  name: 'Confetti',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_confetti' || trace.payload.name === 'ext_confetti',
  effect: ({ trace }) => {
    const canvas = document.querySelector('#confetti-canvas')

    var myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })
    myConfetti({
      particleCount: 200,
      spread: 160,
    })
  },
}

export const FeedbackExtension = {
  name: 'Feedback',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_feedback' || trace.payload.name === 'ext_feedback',
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement('div')

    feedbackContainer.innerHTML = `
          <style>
            .vfrc-feedback {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .vfrc-feedback--description {
                font-size: 0.8em;
                color: grey;
                pointer-events: none;
            }

            .vfrc-feedback--buttons {
                display: flex;
            }

            .vfrc-feedback--button {
                margin: 0;
                padding: 0;
                margin-left: 0px;
                border: none;
                background: none;
                opacity: 0.2;
            }

            .vfrc-feedback--button:hover {
              opacity: 0.5; /* opacity on hover */
            }

            .vfrc-feedback--button.selected {
              opacity: 0.6;
            }

            .vfrc-feedback--button.disabled {
                pointer-events: none;
            }

            .vfrc-feedback--button:first-child svg {
                fill: none; /* color for thumb up */
                stroke: none;
                border: none;
                margin-left: 6px;
            }

            .vfrc-feedback--button:last-child svg {
                margin-left: 4px;
                fill: none; /* color for thumb down */
                stroke: none;
                border: none;
                transform: rotate(180deg);
            }
          </style>
          <div class="vfrc-feedback">
            <div class="vfrc-feedback--description">Was this helpful?</div>
            <div class="vfrc-feedback--buttons">
              <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
              <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            </div>
          </div>
        `

    feedbackContainer
      .querySelectorAll('.vfrc-feedback--button')
      .forEach((button) => {
        button.addEventListener('click', function (event) {
          const feedback = this.getAttribute('data-feedback')
          window.voiceflow.chat.interact({
            type: 'complete',
            payload: { feedback: feedback },
          })

          feedbackContainer
            .querySelectorAll('.vfrc-feedback--button')
            .forEach((btn) => {
              btn.classList.add('disabled')
              if (btn === this) {
                btn.classList.add('selected')
              }
            })
        })
      })

    element.appendChild(feedbackContainer)
  },
}

// YRS: USER AUTHENTICATION FORM

export const AuthenticationFormExtension = {
  name: 'AuthenticationForm',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_auth_form' || trace.payload.name === 'ext_auth_form',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="text"], input[type="email"] {
              width: 100%;
              border: none;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              background: transparent;
              margin: 5px 0;
              outline: none;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
            }
            .half-width {
              width: 48%;
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1);
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
            }
            .privacy {
              display: flex;
              align-items: center;
              font-size: 0.8em;
              color: #888;
              margin: 5px 0;
            }
            .privacy-checkbox {
              margin-right: 10px;
            }
            .privacy label {
              display: flex;
              align-items: center;
            }
            .privacy a {
              color: #2e7ff1;
              text-decoration: none;
            }
            .privacy a:hover {
              text-decoration: underline;
            }
          </style>

          <div class="row">
            <div class="half-width">
              <label for="first-name">First Name</label>
              <input type="text" class="first-name" name="first-name" required>
            </div>
            <div class="half-width">
              <label for="last-name">Last Name</label>
              <input type="text" class="last-name" name="last-name" required>
            </div>
          </div><br>

          <label for="email">Email Address</label>
          <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Invalid email address"><br><br>

          <div class="privacy">
            <input type="checkbox" class="privacy-checkbox" name="privacy-checkbox" required>
            <label for="privacy-checkbox">
              I agree to RomAIx's <a href="YOUR_PRIVACY_POLICY_URL" target="_blank">privacy agreements</a>
            </label>
          </div><br><br>

          <input type="submit" class="submit" value="Submit">
        `

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const firstName = formContainer.querySelector('.first-name')
      const lastName = formContainer.querySelector('.last-name')
      const email = formContainer.querySelector('.email')
      const privacyCheckbox = formContainer.querySelector('.privacy-checkbox')

      if (
        !firstName.checkValidity() ||
        !lastName.checkValidity() ||
        !email.checkValidity() ||
        !privacyCheckbox.checkValidity()
      ) {
        firstName.classList.add('invalid')
        lastName.classList.add('invalid')
        email.classList.add('invalid')
        privacyCheckbox.classList.add('invalid')
        return
      }

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          privacyAgreement: privacyCheckbox.checked // this will be true or false
        },
      })
    })

    element.appendChild(formContainer)
  },
}

export const GTH_FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'GTH_ext_form' || trace.payload.name === 'GTH_ext_form',
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')

    formContainer.innerHTML = `
          <style>
            /* General Styling */
            form {
              font-family: "Montserrat", sans-serif;
              width: 100%;
              padding: 10px;
              background-color: #f9f9f9;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              margin: 0;
            }
            label {
              font-size: 0.9em;
              color: #444;
              margin-bottom: 5px;
              display: block;
              width: 100%;
            }
            .required::after {
              content: ' *';
              color: red;
            }
            input[type="text"], input[type="email"], input[type="tel"], select, textarea {
              width: 100%;
              border: 1px solid #ccc;
              padding: 8px;
              margin-bottom: 10px;
              font-size: 0.9em;
              border-radius: 3px;
              box-sizing: border-box;
              color: #000;
            }
            input::placeholder, textarea::placeholder, select option[value=""] {
              color: #bfbfbf;
            }
            select {
              color: #000;
            }
            select option {
              color: #000;
            }
            textarea {
              width: 100%;
              height: 120px; /* Adjust the height here */
              font-size: 0.85em; /* Adjust the font size here */
              color: #000;
            }
            input[type="submit"] {
              background-color: #ff6900;
              background-color: #ff6900;
              background-image: url('https://cdn-ilbjehj.nitrocdn.com/JKDUxvBhQYoRjXJVdgwijUeNHBiWkdYD/assets/images/optimized/rev-b869123/gotourshawaii.com/wp-content/uploads/2024/05/Black-White-Modern-Handwritten-Square-Studio-Logo-3-1.png');
              border: none;
              color: white;
              padding: 10px 20px;
              border-radius: 12px;
              font-size: 0.9em;
              font-weight: bold;
              text-transform: uppercase;
              cursor: pointer;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              width: 100%;
              transition: background-color 0.3s ease;
            }
            input[type="submit"]:hover {
              background-color: #042d62;
            }
            .invalid {
              border-color: red;
            }
            /* Responsive Styling */
            @media (max-width: 768px) {
              form {
                width: 100%;
              }
              input[type="submit"] {
                font-size: 1em;
                padding: 12px;
              }
            }
          </style>

          <div class="form-row">
            <label for="name" class="required">Name</label>
            <input type="text" class="name" name="name" placeholder="John Doe" required>
          </div>

          <div class="form-row">
            <label for="phone" class="required">Contact Number</label>
            <input type="tel" class="phone" name="phone" placeholder="+123 456 7890" required pattern="\\d+" title="Invalid phone number, please enter only numbers">
          </div>

          <div class="form-row">
            <label for="email" class="required">Email</label>
            <input type="email" class="email" name="email" placeholder="youremail@company.com" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Invalid email address">
          </div>

          <div class="form-row">
            <label for="services" class="required">Services</label>
            <select class="services" name="services" required>
              <option value="" disabled selected>Select Service</option>
              <option value="Oahu Island Tours">Oahu Island Tours</option>
              <option value="Pearl Harbor Tours">Pearl Harbor Tours</option>
              <option value="Luaus Tours">Luaus Tours</option>
              <option value="Private Tours">Private Tours</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div class="form-row">
            <label for="message" class="required">Message</label>
            <textarea class="message" name="message" placeholder="Message" required></textarea>
          </div>

          <input type="submit" class="submit" value="Submit">
        `

    formContainer.addEventListener('submit', function (event) {
      event.preventDefault()

      const name = formContainer.querySelector('.name')
      const phone = formContainer.querySelector('.phone')
      const email = formContainer.querySelector('.email')
      const services = formContainer.querySelector('.services')
      const message = formContainer.querySelector('.message')

      if (
        !name.checkValidity() ||
        !phone.checkValidity() ||
        !email.checkValidity() ||
        !services.checkValidity() ||
        !message.checkValidity()
      ) {
        name.classList.add('invalid')
        phone.classList.add('invalid')
        email.classList.add('invalid')
        services.classList.add('invalid')
        message.classList.add('invalid')
        return
      }

      formContainer.querySelector('.submit').remove()

      window.voiceflow.chat.interact({
        type: 'complete',
        payload: {
          name: name.value,
          phone: phone.value,
          email: email.value,
          services: services.value,
          message: message.value
        },
      })
    })

    element.appendChild(formContainer)
  },
}



// YRS: New collect feedback extension (https://youtu.be/ImklyDQDA40?si=ZETFhyVsMsqZ-VSR)

// GTH_FeedbackExtension with removePreviousFeedbackElements
export const GTH_FeedbackExtension = {
  name: 'Feedback',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'GTH_ext_feedback' || trace.payload.name === 'GTH_ext_feedback',
  render: ({ trace, element }) => {
    removePreviousFeedbackElements(); // Clear previous feedback

    const feedbackContainer = document.createElement('div');
    feedbackContainer.innerHTML = `
      <style>
        .vfrc-feedback {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .vfrc-feedback--description {
          font-size: 0.8em;
          color: grey;
          pointer-events: none;
        }

        .vfrc-feedback--buttons {
          display: flex;
        }

        .vfrc-feedback--button {
          margin: 0;
          padding: 0;
          margin-left: 0px;
          border: none;
          background: none;
          opacity: 0.2;
        }

        .vfrc-feedback--button:hover {
          opacity: 0.5; /* opacity on hover */
        }

        .vfrc-feedback--button.selected {
          opacity: 0.6;
        }

        .vfrc-feedback--button.disabled {
          pointer-events: none;
        }

        .vfrc-feedback--button:first-child svg {
          fill: none; /* color for thumb up */
          stroke: none;
          border: none;
          margin-left: 6px;
        }

        .vfrc-feedback--button:last-child svg {
          margin-left: 4px;
          fill: none; /* color for thumb down */
          stroke: none;
          border: none;
          transform: rotate(180deg);
        }
      </style>
      <div class="vfrc-feedback">
        <div class="vfrc-feedback--description">Was this answer helpful?</div>
        <div class="vfrc-feedback--buttons">
          <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
          <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
        </div>
      </div>
    `;

    feedbackContainer.querySelectorAll('.vfrc-feedback--button').forEach((button) => {
      button.addEventListener('click', function () {
        const feedback = this.getAttribute('data-feedback');
        window.voiceflow.chat.interact({
          type: 'complete',
          payload: { feedback: feedback },
        });

        feedbackContainer.querySelectorAll('.vfrc-feedback--button').forEach((btn) => {
          btn.classList.add('disabled');
          if (btn === this) {
            btn.classList.add('selected');
          }
        });
      });
    });

    element.appendChild(feedbackContainer);
  },
};

// Remove previous feedback function
function removePreviousFeedbackElements() {
  const chatWidget = document.querySelector('#voiceflow-chat').shadowRoot.querySelector('.vfrc-chat--dialog');
  const feedbackWidget = chatWidget.querySelector('.vfrc-feedback');

  if (feedbackWidget) {
    feedbackWidget.closest('.vfrc-system-response').remove();
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// YRS: GIFTCARD & WAITING ANIMATION EXTENSION VAN SHOPIFY VOICEFLOW

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This extension displays a gift card with a specified amount and code
export const GiftCardDisplayExtension = {
  name: 'GiftCardDisplay',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_giftCardDisplay' ||
    trace.payload.name === 'ext_giftCardDisplay',
  render: ({ trace, element }) => {
    const title = trace.payload.title || 'Waikiki Turtle Canyon Snorkel Tour';
    const amount = trace.payload.amount || '20';
    const code = (trace.payload.code || 'G9FD5FEG8HDC8A94').toUpperCase();
    const formattedCode = code.match(/.{1,4}/g).join(' ');
    const logoUrl = 'https://cdn-ilbjehj.nitrocdn.com/JKDUxvBhQYoRjXJVdgwijUeNHBiWkdYD/assets/images/optimized/rev-b869123/gotourshawaii.com/wp-content/uploads/2024/05/Logo-site.svg';
    const borderImageUrl = 'https://cdn-ilbjehj.nitrocdn.com/JKDUxvBhQYoRjXJVdgwijUeNHBiWkdYD/assets/images/optimized/rev-b869123/gotourshawaii.com/wp-content/uploads/2024/05/Black-White-Modern-Handwritten-Square-Studio-Logo-3-1.png';

    const giftCardContainer = document.createElement('div');
    giftCardContainer.innerHTML = `
      <style>
        .vfrc-message--extension-GiftCardDisplay {
          background-color: transparent !important;
          background: none !important;
        }
        .gift-card-border-wrapper {
          position: relative;
          max-width: 420px;
          margin: 0 auto;
          padding: 15px; /* Adjust this value to control border thickness */
          background-color: #042d62;
          background-image: url('${borderImageUrl}');
          background-size: contain;
          background-repeat: repeat;
          border-radius: 12px;
        }
        .gift-card-container {
          font-family: "Montserrat", sans-serif;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          background-color: #fff;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .gift-card-logo {
          width: 150px;
          margin: 0 auto 10px;
          display: block;
        }
        .gift-card-title {
          font-size: 1.1em;
          font-weight: bold;
          margin-bottom: 10px;
          color: #000;
        }
        .gift-card-image {
          width: 100%;
          max-width: 400px;
          border-radius: 8px;
          position: relative;
        }
        .gift-card-amount {
          width: 100%;
          max-width: 350px;
          font-size: 50px;
          font-weight: bold;
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .discount-label {
          font-size: 1.0em; /* Updated font size for "DISCOUNT CODE" */
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .gift-card-code {
          font-size: 14px; /* Updated font size for the unique gift code */
          font-weight: bold;
          margin-bottom: 10px;
          color: #ffffff;/* YRS: White color unique gift code */
          padding: 15px; /* Added padding to make the container larger */
          background-color: #042d62;
          background-image: url('${borderImageUrl}');
          border-radius: 6px; /* Slight rounding for better aesthetics */
          display: inline-block;
        }
        .button {
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 0.9em;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 100%;
          transition: background-color 0.3s ease;
          margin-top: 10px;
          background-color: #ff6900; /* Orange background */
          background-image: url('${borderImageUrl}');
        }
        .button:hover {
          background-color: #042d62;
          color: #ffffff;
          background-image: url('${borderImageUrl}');
        }
      </style>
      <div class="gift-card-border-wrapper">
        <div class="gift-card-container">
          <img src="${logoUrl}" alt="Company Logo" class="gift-card-logo">
          <div class="gift-card-title">${title}</div>
          <div class="gift-card-image">
            <img src="https://yannicksegaar.github.io/VF-extensions/RomAIx_GTH_Carousel_Photos/Carousel_TurtleSnorkel.jpeg" alt="Gift Card" class="gift-card-image">
            <div class="gift-card-amount">$${amount}</div>
          </div>
          <div class="discount-label">DISCOUNT CODE</div>
          <div class="gift-card-code" id="gift-card-code">${formattedCode}</div>
          <button class="button copy-button" id="copy-button">Copy Code</button>
          <button class="button book-button" id="book-button">Book Tour</button>
        </div>
      </div>
    `;

    const copyButton = giftCardContainer.querySelector('#copy-button');
    const giftCardCode = giftCardContainer.querySelector('#gift-card-code');

    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(giftCardCode.textContent).then(() => {
        alert('Gift card code copied to clipboard!');
      });
    });

    const bookButton = giftCardContainer.querySelector('#book-button');
    bookButton.addEventListener('click', () => {
      // Trigger the next message path in Voiceflow
      window.voiceflow.chat.interact({
        type: 'bookTour', // Custom action type
        payload: { bookTour: 1 }, // Payload to indicate that the button was clicked
      });
    });

    element.appendChild(giftCardContainer);
  },
};


















// This extension shows a waiting animation with customizable text and delay
// Also checking for the vf_done value to stop/hide the animation if it's true
export const WaitingAnimationExtension = {
  name: 'WaitingAnimation',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_waitingAnimation' ||
    trace.payload.name === 'ext_waitingAnimation',
  render: async ({ trace, element }) => {
    window.vf_done = true
    await new Promise((resolve) => setTimeout(resolve, 250))

    const text = trace.payload?.text || ''
    const delay = trace.payload?.delay || 3000

    const waitingContainer = document.createElement('div')
    waitingContainer.innerHTML = `
      <style>
        .vfrc-message--extension-WaitingAnimation {
          background-color: transparent !important;
          background: none !important;
        }
        .waiting-animation-container {
          font-family: Arial, sans-serif;
          font-size: 14px;
          font-weight: 300;
          color: #fffc;
          display: flex;
          align-items: center;
        }
        .waiting-text {
          display: inline-block;
          margin-left: 10px;
        }
        .waiting-letter {
          display: inline-block;
          animation: shine 1s linear infinite;
        }
        @keyframes shine {
          0%, 100% { color: #fffc; }
          50% { color: #000; }
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #fffc;
          border-top: 2px solid #042d62;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="waiting-animation-container">
        <div class="spinner"></div>
        <span class="waiting-text">${text
          .split('')
          .map((letter, index) =>
            letter === ' '
              ? ' '
              : `<span class="waiting-letter" style="animation-delay: ${
                  index * (1000 / text.length)
                }ms">${letter}</span>`
          )
          .join('')}</span>
      </div>
    `

    element.appendChild(waitingContainer)

    window.voiceflow.chat.interact({
      type: 'continue',
    })

    let intervalCleared = false
    window.vf_done = false

    const checkDoneInterval = setInterval(() => {
      if (window.vf_done) {
        clearInterval(checkDoneInterval)
        waitingContainer.style.display = 'none'
        window.vf_done = false
      }
    }, 100)

    setTimeout(() => {
      if (!intervalCleared) {
        clearInterval(checkDoneInterval)
        waitingContainer.style.display = 'none'
      }
    }, delay)
  },
}



// YRS: DONE ANIMATION

// This extension triggers a "done" action,
// typically used to signal the completion of a task
// and hide a previous WaitingAnimation
export const DoneAnimationExtension = {
  name: 'DoneAnimation',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_doneAnimation' ||
    trace.payload.name === 'ext_doneAnimation',
  render: async ({ trace, element }) => {
    window.vf_done = true
    await new Promise((resolve) => setTimeout(resolve, 250))

    window.voiceflow.chat.interact({
      type: 'continue',
    })
  },
}

// YRS: INVISIBlE TIMER EXTENSION

export const InvisibleTimerExtension = {
  name: 'Invisible Timer',
  type: 'response',
  match: ({ trace }) =>
    trace.type === 'ext_invisible_timer' || trace.payload.name === 'ext_invisible_timer',
  render: ({ trace }) => {
    const { duration = 5 } = trace.payload || {}; // Default to 5 seconds if duration is not provided

    const countdown = setTimeout(() => {
      window.voiceflow.chat.interact({ type: 'complete' }); // Proceed to the next step after the delay
      clearTimeout(countdown); // Clear the timeout to avoid memory leaks
    }, duration * 1000); // Convert seconds to milliseconds
  },
};


// YRS: Disable Input Extension

export const DisableInputExtension = {
  name: 'DisableInput',
  type: 'effect',
  match: ({ trace }) =>
    trace.type === 'ext_disableInput' ||
    trace.payload.name === 'ext_disableInput',
  effect: ({ trace }) => {
    const { isDisabled } = trace.payload

    function disableInput() {
      const chatDiv = document.getElementById('voiceflow-chat')

      if (chatDiv) {
        const shadowRoot = chatDiv.shadowRoot
        if (shadowRoot) {
          const chatInput = shadowRoot.querySelector('.vfrc-chat-input')
          const textarea = shadowRoot.querySelector(
            'textarea[id^="vf-chat-input--"]'
          )
          const button = shadowRoot.querySelector('.vfrc-chat-input--button')

          if (chatInput && textarea && button) {
            // Add a style tag if it doesn't exist
            let styleTag = shadowRoot.querySelector('#vf-disable-input-style')
            if (!styleTag) {
              styleTag = document.createElement('style')
              styleTag.id = 'vf-disable-input-style'
              styleTag.textContent = `
                .vf-no-border, .vf-no-border * {
                  border: none !important;
                }
                .vf-hide-button {
                  display: none !important;
                }
              `
              shadowRoot.appendChild(styleTag)
            }

            function updateInputState() {
              textarea.disabled = isDisabled
              if (!isDisabled) {
                textarea.placeholder = 'Message...'
                chatInput.classList.remove('vf-no-border')
                button.classList.remove('vf-hide-button')
                // Restore original value getter/setter
                Object.defineProperty(
                  textarea,
                  'value',
                  originalValueDescriptor
                )
              } else {
                textarea.placeholder = ''
                chatInput.classList.add('vf-no-border')
                button.classList.add('vf-hide-button')
                Object.defineProperty(textarea, 'value', {
                  get: function () {
                    return ''
                  },
                  configurable: true,
                })
              }

              // Trigger events to update component state
              textarea.dispatchEvent(
                new Event('input', { bubbles: true, cancelable: true })
              )
              textarea.dispatchEvent(
                new Event('change', { bubbles: true, cancelable: true })
              )
            }

            // Store original value descriptor
            const originalValueDescriptor = Object.getOwnPropertyDescriptor(
              HTMLTextAreaElement.prototype,
              'value'
            )

            // Initial update
            updateInputState()
          } else {
            console.error('Chat input, textarea, or button not found')
          }
        } else {
          console.error('Shadow root not found')
        }
      } else {
        console.error('Chat div not found')
      }
    }

    disableInput()
  },
}
