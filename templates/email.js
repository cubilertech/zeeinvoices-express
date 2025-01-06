
const emailHeader = () => {
  return `
<head>
<style>
  @media screen and (max-width: 600px) {
  .mainContainer {
      padding: 20px 0 !important;
  }
    .center-on-small {
      text-align: center !important;
    }
    .image-footer {
    margin: 0 auto 48px auto;
    }
    .displays {
      display: block !important;
    }
    .marginsContainer {
      width: fit-content !important;
      margin: 0 auto !important;
    }
    .flexContainer {
      display: block !important;
    }
    .marginBottom {
      margin-bottom: 24px !important;
    }
  }
  @media screen and (min-width: 601px) {
    .mainContainer {
      padding-top: 48px !important;
      padding-bottom: 48px !important;
      padding-left: 32px !important;
      padding-right: 64px !important;
    }
    .center-on-small {
      text-align: left !important;
    }
    .image-footer {
    margin: 0;
    }
    .displays {
      display: inline-block !important;
    }
    .marginsContainer {
      margin: 0 0 0 auto !important;
    }
    .flexContainer {
    display: flex;
    }
    .marginBottom {
      margin-bottom: 0 !important;
    }
  }
</style>
</head>
<body>
<div style="background-color: white;" class="mainContainer">
  <img style="height:32px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
  `
};

const emailFooter = () => {
  return `
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:700; color: #4F5A68">Warm regards,</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">The ZeeInvoices Team</p>

<div style="margin-top:56px; padding-top: 32px; padding-bottom: 32px; border-top: 1px solid #D4D5D6"> <!-- bottom section -->

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899" class="center-on-small">You’re receiving this email because you signed up for ZeeInvoices. If you no longer wish to receive these emails, you can unsubscribe <span><a href="#" style="color: #4B5565">here</a></span>.</p>

<div style="width: 100%" class="flexContainer"> <!-- footer section -->
<div class="displays center-on-small marginBottom" style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">© 2024 ZeeInvoices. All rights reserved.</div>
<p class="displays marginsContainer" style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68;"><span><a href="https://zeeinvoices.com/about-us" target="_blank" style="color: #4F35DF">support</a></span> | <span><a href="https://zeeinvoices.com/terms-and-condition" target="_blank" style="color: #4F35DF">terms & conditions</a></span></p>
</div>

</div>

<div style="width: 100%; margin-top:40px;" class="flexContainer"> <!-- footer section -->
<img class="image-footer displays" style="height: 24px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
<div class="displays marginsContainer"> <!-- social links -->
<a  href="https://www.facebook.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/facebook-et-icon.png" alt="f"></a>
<a  href="https://www.instagram.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/instagram-et-icon.png" alt="i"></a>
<a  href="https://www.youtube.com/@ZeeInvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/youtube-et-icon.png" alt="y"></a>
<a  href="https://twitter.com/zeeinvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/twitter-et-icon.png" alt="x"></a>
<a  href="https://www.linkedin.com/company/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/linkedin-et-icon.png" alt="l"></a> 
</div>
</div>
`;
}

exports.inoviceCreatedTemplate = () => {
  return `<div><h1 style="color:#8477ad;text-align:center">ZeeInovoice</h1>
    <p style="color:#100d24l;font-size:22px">Your Invoice is created successfully.</p>
    </div>`;
};


exports.inoviceCreatedToFromTemplate = () => {
  return `<div><h1 style="color:#8477ad;text-align:center">ZeeInovoice</h1>
    <p style="color:#100d24l;font-size:22px">Invoice is created by your email.</p>
    </div>`;
};

exports.accountCreatedTemplate = (user) => {
  return `
${emailHeader()}
<p style="font-family: Arial;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Hi ${user?.name},</p>
<p style="font-family: Arial;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">Welcome to ZeeInvoices! Invoice Like a Pro in Minutes</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:700; color: #4F5A68">Welcome Aboard!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">We’re excited to have you join the ZeeInvoices family! 🎉 </p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Say goodbye to the stress of invoicing and hello to seamless, professional invoices in just a few clicks. Whether you’re a freelancer, small business owner, or managing a team,</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">ZeeInvoices is here to help you get paid faster, with less hassle. </p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">With our easy-to-use platform, you’ll be able to: </p>

<ul>
    <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Create customized invoices in minutes.</p></li>
    <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Track payments effortlessly.</p></li>
    <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Automate payment reminders and avoid late fees.</p></li>
</ul>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:700; color: #4F5A68">Get Started Now!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Click below to sign in and create your first invoice. It’s quick, simple, and designed for busy professionals like you.</p>

<a href="https://zeeinvoices.com" target="_blank">
<button style="font-size: 16px; line-height: 24px; font-weight:700;background-color: #4F35DF; color: white; border: none; border-radius: 4px; padding-top: 12px;padding-bottom: 12px; padding-right: 48px; padding-left: 48px" >Sign In & Create Your Invoice</button>
</a>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Welcome to ZeeInvoices – we’re here to make your invoicing experience better than ever!</p>

${emailFooter()}
</div>`;
};

exports.accountInactiveTemplate = (data) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
${emailHeader()}
<p style="font-family: Arial;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Hi ${data?.name},</p>
<p style="font-family: Arial;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">It’s Been a While – Come Back and Get Started with Zeeinvoices!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">We noticed it’s been a while since you’ve logged into your Zeeinvoices account, and we just wanted to check in. We miss having you with us and wanted to remind you of the amazing features you’ve been missing out on!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:700; color: #4F5A68">What’s New at Zeeinvoices:</p>

<ul>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Enhanced invoicing tools to make your life easier</p></li>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Faster payment tracking and reporting</p></li>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Improved user experience for smoother navigation</p></li>
</ul>  

<a href="https://zeeinvoices.com" target="_blank">
<button style="font-size: 16px; line-height: 24px; font-weight:700;background-color: #4F35DF; color: white; border: none; border-radius: 4px; padding-top: 12px;padding-bottom: 12px; padding-right: 48px; padding-left: 48px" >Get Started</button>
</a>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Need any help? Our support team is always here if you have any questions or need assistance getting started again.</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">We can’t wait to have you back!</p>


 ${emailFooter()}
</div>`;
}

exports.emailInvoiceToClient = (sender,client,invoice) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
${emailHeader()}
<p style="font-family: Arial;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Dear ${client?.name},</p>

<p style="font-family: Arial;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">You've Received an Invoice from ${sender?.name}</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">You have received an invoice from ${sender?.name}. Below are the details:</p>

<ul>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Invoice ID: ${invoice?.id}</p></li>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Amount: ${invoice?.total}</p></li>
 
</ul>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Please review and process the invoice at your earliest convenience.</p>
 ${emailFooter()}
</div>`
}

exports.emailInvoiceToSender = (sender) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
${emailHeader()}
<p style="font-family: Arial, sans-serif;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Hi ${sender?.name},</p>
<p style="font-family: Arial, sans-serif;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">Success! Your New Invoice is Ready</p>

<p style="font-family: Arial, sans-serif;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Great news – your new invoice has been successfully created!</p>

<p style="font-family: Arial, sans-serif;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Attached, you’ll find your PDF invoice ready to download and share. We’re here to make invoicing as seamless and efficient as possible.</p>

<p style="font-family: Arial, sans-serif;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">[PDF file]</p>

<p style="font-family: Arial, sans-serif;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Need to make any edits or create another invoice? Simply sign in to your ZeeInvoices account and continue with ease.</p>

<p style="font-family: Arial, sans-serif;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Thank you for choosing ZeeInvoices to streamline your invoicing process!</p>

</div>`;
}

exports.approachingRecepientEmail = (data) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
${emailHeader()}
<p style="font-family: Arial;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Hi ${data?.name},</p>
<p style="font-family: Arial;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">Say Goodbye to Complex Invoicing – Welcome to Zeeinvoices!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">We noticed that you often create business invoices using various platforms. We understand how time-consuming and complex managing invoices can be. That’s why we’re excited to introduce you to Zeeinvoices – the platform designed to simplify your invoicing process.</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:700; color: #4F5A68">With Zeeinvoices, you can:</p>

<ul>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Create professional invoices quickly and effortlessly</p></li>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Streamline your business operations in one place</p></li>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Manage payments and keep track of your financials with ease</p></li>
</ul>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Thousands of professionals, freelancers, and businesses already use Zeeinvoices to make invoicing a seamless part of their workflow.</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:700; color: #4F5A68">Ready to Simplify Your Invoicing?</p>
<a href="https://zeeinvoices.com" target="_blank">
<button style="font-size: 16px; line-height: 24px; font-weight:700;background-color: #4F35DF; color: white; border: none; border-radius: 4px; padding-top: 12px;padding-bottom: 12px; padding-right: 48px; padding-left: 48px" >Learn More & Get Started</button>
</a>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">We’d love to help you take control of your invoicing and make it a breeze.</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Looking forward to welcoming you on board!</p>

${emailFooter()}
 
</div>`;
}