# Sitecore Send MCP Server (Unofficial)

## Tools

### SMTP

- [x] `send_smtp_email` - Send an email using SMTP

### API

- [x] `get_lists` - get email lists
- [x] `get_list_members` - get email list members
- [x] `add_list_member` - add email list member
- [x] `remove_list_member` - remove email list member
- [x] `send_transactional_email` - Send an email using transactional email service

## Usage

### Manual install

```json
{
  "mcpServers": {
    "send-mcp": {
      "command": "npx",
      "args": ["send-mcp"],
      "env": {
        "API_KEY": "xxxxx",
        "TRANSACTIONAL_EMAILS_CAMPAIGN_ID": "xxxxx",
        "SMTP_ENABLED": "true",
        "SMTP_FROM": "xxxxx",
        "SMTP_USER": "xxxxx",
        "SMTP_PASSWORD": "xxxxx"
      }
    }
  }
}
```

### stdio

```bash
npx send-mcp
```

### sse

```bash
npx send-mcp sse --port 3000
```

## Environment variables

```properties
# To Use API
API_KEY=[Sitecore Send API Key]
# To enable send_transactional_email
TRANSACTIONAL_EMAILS_CAMPAIGN_ID=[transactional email campaign id]
# Enable SMTP
SMTP_ENABLED=true
# SMTP
SMTP_FROM=[SMTP From Address]
SMTP_USER=[SMTP User]
SMTP_PASSWORD=[SMTP Password]
```
