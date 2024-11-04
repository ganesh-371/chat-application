import React from 'react';
import { Mail, Phone, MessageCircle, FileText, Clock, Globe } from 'lucide-react';

// Support Channels Data
const supportChannelsData = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Live Chat Support",
    description: "Get instant help from our team",
    availability: "24/7",
    action: "Start Chat",
    link: "/chat"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Support",
    description: "Send us your queries",
    availability: "Response within 24 hours",
    action: "Email Us",
    link: "mailto:support@aichatbot.com"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone Support",
    description: "Speak with our support team",
    availability: "Mon-Fri, 9AM-6PM EST",
    action: "Call Now",
    link: "tel:+1234567890"
  }
];

// Common Issues Data
const commonIssuesData = [
  {
    title: "Account Setup",
    topics: [
      { id: 1, text: "Account creation", link: "/help/account-creation" },
      { id: 2, text: "Profile settings", link: "/help/profile-settings" },
      { id: 3, text: "Password reset", link: "/help/password-reset" },
      { id: 4, text: "Account verification", link: "/help/verification" }
    ]
  },
  {
    title: "Billing & Subscription",
    topics: [
      { id: 1, text: "Payment methods", link: "/help/payment" },
      { id: 2, text: "Invoice requests", link: "/help/invoices" },
      { id: 3, text: "Subscription plans", link: "/help/plans" },
      { id: 4, text: "Refund policy", link: "/help/refunds" }
    ]
  },
  {
    title: "Technical Issues",
    topics: [
      { id: 1, text: "Connection problems", link: "/help/connection" },
      { id: 2, text: "API integration", link: "/help/api" },
      { id: 3, text: "Performance issues", link: "/help/performance" },
      { id: 4, text: "Error messages", link: "/help/errors" }
    ]
  }
];

// Self-Help Resources Data
const resourcesData = [
  {
    icon: <FileText className="w-6 h-6 mr-3" />,
    title: "Documentation",
    description: "Detailed guides and tutorials",
    link: "/documentation"
  },
  {
    icon: <Globe className="w-6 h-6 mr-3" />,
    title: "Knowledge Base",
    description: "Browse through our help articles",
    link: "/knowledge-base"
  }
];

// Contact Information Data
const contactData = {
  email: "support@aichatbot.com",
  phone: "+91 9876543210",
  hours: "Monday to Friday, 9:00 AM - 6:00 PM IST"
};

const Support = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">How Can We Help You?</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our support team is here to assist you. Choose from our various support channels
          or browse through commonly asked questions.
        </p>
      </div>

      {/* Support Channels */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {supportChannelsData.map((channel, index) => (
          <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              {channel.icon}
              <h2 className="text-xl font-semibold ml-2">{channel.title}</h2>
            </div>
            <p className="text-gray-600 mb-2">{channel.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              <Clock className="w-4 h-4 inline mr-1" />
              {channel.availability}
            </p>
            <a
              href={channel.link}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {channel.action}
            </a>
          </div>
        ))}
      </div>

      {/* Common Issues Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Common Issues</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {commonIssuesData.map((category, index) => (
            <div key={index} className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.topics.map((topic) => (
                  <li key={topic.id} className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <a href={topic.link} className="hover:text-blue-600">
                      {topic.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Help Resources */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Self-Help Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {resourcesData.map((resource, index) => (
            <a 
              key={index}
              href={resource.link} 
              className="flex items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              {resource.icon}
              <div>
                <h3 className="font-semibold">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-gray-600 mb-6">
          Our support team is available to help you with any questions or concerns.
        </p>
        <div className="inline-flex space-x-4">
          <a href={`mailto:${contactData.email}`} className="text-blue-600 hover:text-blue-700">
            {contactData.email}
          </a>
          <span className="text-gray-300">|</span>
          <a href={`tel:${contactData.phone}`} className="text-blue-600 hover:text-blue-700">
            {contactData.phone}
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-2">{contactData.hours}</p>
      </div>
    </div>
  );
};

export default Support;

