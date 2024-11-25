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
return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
<img style="height:32px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
<p style="font-family: Arial;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Hi ${user?.name},</p>
<p style="font-family: Arial;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">Invoice Like a Pro – Your Journey Begins Now!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Welcome to the ZeeInvoices family! We’re thrilled to have you here.</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">ZeeInvoices is designed to make invoicing simple, seamless, and stress-free. Whether you're a freelancer, a small business owner, or managing a team, we're here to help you get paid faster with professional invoices in just a few clicks.</p>

<a href="https://zeeinvoices.com" target="_blank">
<button style="font-size: 16px; line-height: 24px; font-weight:700;background-color: #4F35DF; color: white; border: none; border-radius: 4px; padding-top: 12px;padding-bottom: 12px; padding-right: 48px; padding-left: 48px" >Sign In & Create Your Invoice</button>
</a>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Click below to sign in and create your first invoice – it's quick and easy!Welcome aboard and happy invoicing!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Warm regards,</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">The ZeeInvoices Team</p>

<div style="margin-top:60px;padding-top: 48px;padding-bottom: 48px; border-top: 1px solid #D4D5D6"> <!-- bottom section -->

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">You’re receiving this email because you signed up for ZeeInvoices. If you no longer wish to receive these emails, you can unsubscribe <span><a href="#" style="color: #4B5565">here</a></span>.</p>

<div style="width: 100%; justify-content: space-between"> <!-- footer section -->

<p style="display: inline-block; font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">© 2024 ZeeInvoices. All rights reserved.</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68; float: right;"><span><a href="https://zeeinvoices.com/about-us" target="_blank" style="color: #4F35DF">support</a></span> | <span><a href="https://zeeinvoices.com/terms-and-condition" target="_blank" style="color: #4F35DF">terms & conditions</a></span></p>
</div>
</div>

<div style="width: 100%; margin-top:40px; display: flex; flex-direction: row; justify-content: space-between"> <!-- footer section -->
<img style="height:24px" src="" alt="zeeinvoices">
<div style="align-items: center; float: right;"> <!-- social links -->
<a  href="https://www.facebook.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/facebook-et-icon.png" alt="f"></a>
<a  href="https://www.instagram.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/instagram-et-icon.png" alt="i"></a>
<a  href="https://www.youtube.com/@ZeeInvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/youtube-et-icon.png" alt="y"></a>
<a  href="https://twitter.com/zeeinvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/twitter-et-icon.png" alt="x"></a>
<a  href="https://www.linkedin.com/company/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/linkedin-et-icon.png" alt="l"></a> 
</div>
</div>
</div>`;
};

exports.accountInactiveTemplate = (data) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
<img style="height:32px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
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

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Warm regards,</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">The ZeeInvoices Team</p>

<div style="margin-top:60px;padding-top: 48px;padding-bottom: 48px; border-top: 1px solid #D4D5D6"> <!-- bottom section -->

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">You’re receiving this email because you signed up for ZeeInvoices. If you no longer wish to receive these emails, you can unsubscribe <span><a href="#" style="color: #4B5565">here</a></span>.</p>

<div style="width: 100%; justify-content: space-between"> <!-- footer section -->

<p style="display: inline-block; font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">© 2024 ZeeInvoices. All rights reserved.</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68; float: right;"><span><a href="https://zeeinvoices.com/about-us" target="_blank" style="color: #4F35DF">support</a></span> | <span><a href="https://zeeinvoices.com/terms-and-condition" target="_blank" style="color: #4F35DF">terms & conditions</a></span></p>
</div>
</div>

<div style="width: 100%; margin-top:40px; display: flex; flex-direction: row; justify-content: space-between"> <!-- footer section -->
<img style="height:24px" src="" alt="zeeinvoices">
<div style="align-items: center; float: right;"> <!-- social links -->
<a  href="https://www.facebook.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/facebook-et-icon.png" alt="f"></a>
<a  href="https://www.instagram.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/instagram-et-icon.png" alt="i"></a>
<a  href="https://www.youtube.com/@ZeeInvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/youtube-et-icon.png" alt="y"></a>
<a  href="https://twitter.com/zeeinvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/twitter-et-icon.png" alt="x"></a>
<a  href="https://www.linkedin.com/company/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/linkedin-et-icon.png" alt="l"></a> 
</div>
</div>
 
</div>`;
}

exports.emailInvoiceToClient = (sender,client,invoice) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
<img style="height:32px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
<p style="font-family: Arial;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Dear ${client?.name},</p>

<p style="font-family: Arial;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">You've Received an Invoice from ${sender?.name}</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">You have received an invoice from ${sender?.name}. Below are the details:</p>

<ul>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Invoice ID: ${invoice?.id}</p></li>
  <li><p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Amount: ${invoice?.total}</p></li>
 
</ul>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Please review and process the invoice at your earliest convenience.</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Warm regards,</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">The ZeeInvoices Team</p>

<div style="margin-top:60px;padding-top: 48px;padding-bottom: 48px; border-top: 1px solid #D4D5D6"> <!-- bottom section -->

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">You’re receiving this email because you signed up for ZeeInvoices. If you no longer wish to receive these emails, you can unsubscribe <span><a href="#" style="color: #4B5565">here</a></span>.</p>

<div style="display: flex; flex-direction: row; justify-content: space-between"> <!-- footer section -->

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">© 2024 ZeeInvoices. All rights reserved.</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68"><span><a href="#" style="color: #4F35DF">support</a></span> | <span><a href="#" style="color: #4F35DF">terms & conditions</a></span></p>
</div>
</div>

<div style="display: flex; flex-direction: row; justify-content: space-between"> <!-- footer section -->
<img style="height:24px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
<div style="width:150px; justify-content: space-between; display: flex; flex-direction: row; align-items: center"> <!-- social links -->
<a  href="https://www.facebook.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/facebook-et-icon.png" alt="f"></a>
<a  href="https://www.instagram.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/instagram-et-icon.png" alt="i"></a>
<a  href="https://www.youtube.com/@ZeeInvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/youtube-et-icon.png" alt="y"></a>
<a  href="https://twitter.com/zeeinvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/twitter-et-icon.png" alt="x"></a>
<a  href="https://www.linkedin.com/company/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/linkedin-et-icon.png" alt="l"></a> 
</div>
</div>
 
</div>`
}

exports.emailInvoiceToSender = (sender) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
<img style="height:32px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
<p style="font-family: Arial;font-size: 28px; line-height: 36px; font-weight:400; color: #4F5A68;">Hi ${sender?.name},</p>
<p style="font-family: Arial;font-size: 40px; line-height: 44px; font-weight:700; color: #4F5A68;">Success! Your New Invoice is Ready</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Great news – your new invoice has been successfully created!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Attached, you’ll find your PDF invoice ready to download and share. We’re here to make invoicing as seamless and efficient as possible.</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">[PDF file]</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Need to make any edits or create another invoice? Simply sign in to your ZeeInvoices account and continue with ease.</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Thank you for choosing ZeeInvoices to streamline your invoicing process!</p>

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Warm regards,</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">The ZeeInvoices Team</p>

<div style="margin-top:60px;padding-top: 48px;padding-bottom: 48px; border-top: 1px solid #D4D5D6"> <!-- bottom section -->

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">You’re receiving this email because you signed up for ZeeInvoices. If you no longer wish to receive these emails, you can unsubscribe <span><a href="#" style="color: #4B5565">here</a></span>.</p>

<div style="width: 100%; justify-content: space-between"> <!-- footer section -->

<p style="display: inline-block; font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">© 2024 ZeeInvoices. All rights reserved.</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68; float: right;"><span><a href="https://zeeinvoices.com/about-us" target="_blank" style="color: #4F35DF">support</a></span> | <span><a href="https://zeeinvoices.com/terms-and-condition" target="_blank" style="color: #4F35DF">terms & conditions</a></span></p>
</div>
</div>

<div style="width: 100%; margin-top:40px; display: flex; flex-direction: row; justify-content: space-between"> <!-- footer section -->
<img style="height:24px" src="" alt="zeeinvoices">
<div style="align-items: center; float: right;"> <!-- social links -->
<a  href="https://www.facebook.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/facebook-et-icon.png" alt="f"></a>
<a  href="https://www.instagram.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/instagram-et-icon.png" alt="i"></a>
<a  href="https://www.youtube.com/@ZeeInvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/youtube-et-icon.png" alt="y"></a>
<a  href="https://twitter.com/zeeinvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/twitter-et-icon.png" alt="x"></a>
<a  href="https://www.linkedin.com/company/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/linkedin-et-icon.png" alt="l"></a> 
</div>
</div>
 
</div>`;
}

exports.approachingRecepientEmail = (data) => {
  return `<div style="background-color: #F2F2F7; padding-top: 48px;padding-bottom: 48px; padding-right: 60px; padding-left: 60px">
<img style="height:32px" src="https://zeeinvoices.com/Images/logos/zee-logo.png" alt="zeeinvoices">
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

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">Warm regards,</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68">The ZeeInvoices Team</p>

<div style="margin-top:60px;padding-top: 48px;padding-bottom: 48px; border-top: 1px solid #D4D5D6"> <!-- bottom section -->

<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">You’re receiving this email because you signed up for ZeeInvoices. If you no longer wish to receive these emails, you can unsubscribe <span><a href="#" style="color: #4B5565">here</a></span>.</p>

<div style="width: 100%; justify-content: space-between"> <!-- footer section -->

<p style="display: inline-block; font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A6899">© 2024 ZeeInvoices. All rights reserved.</p>
<p style="font-family: Arial;font-size: 16px; line-height: 24px; font-weight:400; color: #4F5A68; float: right;"><span><a href="https://zeeinvoices.com/about-us" target="_blank" style="color: #4F35DF">support</a></span> | <span><a href="https://zeeinvoices.com/terms-and-condition" target="_blank" style="color: #4F35DF">terms & conditions</a></span></p>
</div>
</div>

<div style="width: 100%; margin-top:40px; display: flex; flex-direction: row; justify-content: space-between"> <!-- footer section -->
<img style="height:24px" src="" alt="zeeinvoices">
<div style="align-items: center; float: right;"> <!-- social links -->
<a  href="https://www.facebook.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/facebook-et-icon.png" alt="f"></a>
<a  href="https://www.instagram.com/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/instagram-et-icon.png" alt="i"></a>
<a  href="https://www.youtube.com/@ZeeInvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/youtube-et-icon.png" alt="y"></a>
<a  href="https://twitter.com/zeeinvoices" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/twitter-et-icon.png" alt="x"></a>
<a  href="https://www.linkedin.com/company/zeeinvoices/" target="_blank" rel="noopener noreferrer" style="text-decoration:none; margin-left: 12px"><img style="height:20px; width:20px" src="https://zeeinvoices.com/Images/icons/linkedin-et-icon.png" alt="l"></a> 
</div>
</div>
 
</div>`;
}