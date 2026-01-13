# n8n-nodes-leanplum

> [Velocity BPA Licensing Notice]
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Leanplum, the multi-channel customer engagement platform for mobile-first growth. This node enables workflow automation for user management, messaging campaigns, A/B testing, push notifications, in-app messaging, email, and behavioral analytics.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)

## Features

- **User Management**: Set/get user attributes, track events, track purchases, manage sessions
- **Message Campaigns**: Create, manage, and schedule multi-channel messaging campaigns
- **Campaign Management**: Create and manage lifecycle, scheduled, and triggered campaigns
- **Push Notifications**: Send targeted push notifications with platform-specific options
- **In-App Messages**: Create and manage in-app messaging experiences
- **Segmentation**: Build and manage user segments with attribute, behavior, and event filters
- **A/B Testing**: Create and analyze A/B tests with statistical significance tracking
- **Event Tracking**: Track custom events and user behaviors with batch support
- **Variables**: Manage personalized content variables
- **Data Export**: Export data to Amazon S3 or Google Cloud Storage

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Select **Install**
4. Enter `n8n-nodes-leanplum`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the node
npm install n8n-nodes-leanplum
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-leanplum.git
cd n8n-nodes-leanplum

# Install dependencies
npm install

# Build the project
npm run build

# Link to n8n
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-leanplum

# Restart n8n
```

## Credentials Setup

To use this node, you need to set up Leanplum API credentials:

| Field | Description |
|-------|-------------|
| App ID | Your Leanplum Application ID |
| Production Key | API key for production environment |
| Development Key | API key for development/testing (optional) |
| Data Export Key | API key for export operations (optional) |
| Environment | Select production or development |

### Obtaining API Keys

1. Log into your [Leanplum Dashboard](https://www.leanplum.com/)
2. Navigate to **App Settings** > **Keys & Settings**
3. View or generate API keys by type
4. Copy the App ID and appropriate keys

## Resources & Operations

### User Resource (12 operations)
- Set User Attributes
- Get User Attributes
- Advance State
- Track Event
- Track Purchase
- Increment User Attribute
- Delete User
- Get User
- Pause Session
- Resume Session
- Set Device Attributes
- Unset User Attribute

### Message Resource (14 operations)
- Create, Get, Get Many, Update, Delete
- Duplicate, Archive, Unarchive
- Get Stats, Pause, Resume
- Schedule, Send Now, Get Variants

### Campaign Resource (12 operations)
- Create, Get, Get Many, Update, Delete
- Start, Stop, Pause
- Get Report, Get Conversions, Get Retention
- Duplicate

### Push Notification Resource (10 operations)
- Send, Send to User, Send to Segment
- Schedule, Cancel
- Get Delivery Stats
- Create/Get/Update/Delete Templates

### In-App Message Resource (10 operations)
- Create, Get, Get Many, Update, Delete
- Preview, Get Stats
- Duplicate, Activate, Deactivate

### Segment Resource (9 operations)
- Create, Get, Get Many, Update, Delete
- Get Users, Get Size
- Export, Duplicate

### A/B Test Resource (11 operations)
- Create, Get, Get Many, Update, Delete
- Start, Stop
- Get Results, Declare Winner
- Get Variants, Update Variant

### Event Resource (9 operations)
- Track, Track Batch
- Get Events, Get Event Properties, Get Event Counts
- Create Event, Update Event, Delete Event
- Export Events

### Variable Resource (6 operations)
- Set Variables, Get Variables
- Get Defaults, Sync
- Get Many for User, Force Content Update

### Export Resource (6 operations)
- Export Data, Get Export Job, Get Export Jobs
- Cancel Export, Get Data Schema, Download Export

## Trigger Node

The **Leanplum Trigger** node allows you to start workflows when Leanplum events occur:

- `session.start` - User session started
- `session.end` - User session ended
- `event.tracked` - Custom event tracked
- `purchase.made` - Purchase completed
- `message.sent` - Message sent to user
- `message.opened` - Message opened
- `message.clicked` - Message link clicked
- `push.delivered` - Push notification delivered
- `push.opened` - Push notification opened
- `inapp.displayed` - In-app message shown
- `inapp.dismissed` - In-app message closed
- `state.changed` - User state changed
- `attribute.changed` - User attribute updated

### Webhook Configuration

1. In n8n, add a Leanplum Trigger node to your workflow
2. Copy the webhook URL provided
3. In Leanplum, navigate to **Data Export** > **Webhooks**
4. Create a new webhook with the n8n URL
5. Select events to subscribe to
6. Optionally configure a webhook secret for verification

## Usage Examples

### Track a User Event

```javascript
// Track a custom event for a user
{
  "resource": "user",
  "operation": "track",
  "userId": "user-12345",
  "event": "item_viewed",
  "additionalFields": {
    "value": 29.99,
    "params": {
      "item_id": "SKU-001",
      "category": "electronics"
    }
  }
}
```

### Send a Push Notification

```javascript
// Send a push notification to a user
{
  "resource": "pushNotification",
  "operation": "sendToUser",
  "userId": "user-12345",
  "message": "Your order has shipped!",
  "title": "Order Update",
  "data": {
    "orderId": "ORD-789",
    "trackingUrl": "https://example.com/track/789"
  }
}
```

### Create a Segment

```javascript
// Create a user segment
{
  "resource": "segment",
  "operation": "create",
  "name": "High-Value Users",
  "additionalFields": {
    "description": "Users with purchase value > $100",
    "filters": {
      "attributeFilters": [{
        "attribute": "total_purchase_value",
        "operator": "greaterThan",
        "value": 100
      }]
    }
  }
}
```

## Leanplum Concepts

### API Keys

Leanplum uses different API keys for different purposes:
- **Production Key**: Full access for production operations
- **Development Key**: Limited access for development/testing
- **Data Export Key**: Access to export endpoints only

### Multi-Action Batching

The node supports batching up to 50 actions in a single API request, reducing API calls and improving efficiency.

### Rate Limits

- Standard: 10 requests/second
- Enterprise: Higher limits per contract
- Export: 1 concurrent job

## Error Handling

The node provides detailed error messages from the Leanplum API:

- `Invalid App ID`: Incorrect appId parameter
- `Invalid client key`: Wrong API key for operation
- `Rate limit exceeded`: Too many requests
- `User not found`: Invalid userId
- `Message not found`: Invalid messageId

## Security Best Practices

1. **Store credentials securely**: Use n8n's credential management
2. **Use appropriate keys**: Use development keys for testing
3. **Verify webhooks**: Configure webhook secrets for trigger nodes
4. **Limit data access**: Use data export keys only for export operations

## Development

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Build
npm run build
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes linting and tests before submitting.

## Support

- **Documentation**: [Leanplum API Documentation](https://docs.leanplum.com/)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-leanplum/issues)
- **Commercial Support**: licensing@velobpa.com

## Acknowledgments

- [Leanplum](https://www.leanplum.com/) for their mobile marketing platform
- [n8n](https://n8n.io/) for the workflow automation platform
- The n8n community for inspiration and support
