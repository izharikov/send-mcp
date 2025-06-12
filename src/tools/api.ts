import { FastMCP } from "fastmcp";
import { z } from "zod";
import { SendClient, ApiConfig, ApiResponseError } from "send-client";

export const addApiTools: (server: FastMCP, config: Partial<ApiConfig>, transactoinalConfog: { campaignId: string | undefined }) => void = (server, config, transactoinalConfog) => {
  if (!config.apiKey) {
    return;
  }

  const client = new SendClient({ apiKey: config.apiKey!, baseUrl: config.baseUrl });

  server.addTool({
    name: "get_lists",
    description: "Get all available mailing lists",
    annotations: {
      title: "Get all available mailing lists",
      openWorldHint: true,
    },
    execute: async (_, { log }) => {
      log.info("Get all available mailing lists");
      const lists = await client.lists.getAll();
      const result = lists.MailingLists.map(x => `- '${x.Name}', status: '${x.StatusValue}', (id: '${x.ID}')`);
      return {
        content: [
          { type: "text", text: result.join("\n") }
        ]
      }
    }
  });

  server.addTool({
    name: "get_single_list",
    description: "Get a single mailing list details: total count, status, etc",
    parameters: z.object({
      listId: z.string().uuid().describe("Id of the mailing list")
    }),
    annotations: {
      title: "Get a single mailing list",
      openWorldHint: true,
    },
    execute: async ({ listId }) => {
      const listResponse = await client.lists.getById(listId);
      const list = listResponse;
      type Keys = keyof typeof list;
      const keys = ['Name', 'ActiveMemberCount', 'BouncedMemberCount', 'RemovedMemberCount', 'UnsubscribedMemberCount', 'Preferences', 'StatusValue'] as Keys[];
      return {
        content: [
          { type: "text", text: keys.map(x => `- ${x}: '${list[x]}'`).join("\n") }
        ]
      }
    }
  });

  server.addTool({
    name: "get_subscribers",
    description: "Get subscribers of a mailing list",
    parameters: z.object({
      listId: z.string().uuid().describe("Id of the mailing list")
    }),
    annotations: {
      title: "Get subscribers of a mailing list",
      openWorldHint: true,
    },
    execute: async ({ listId }) => {
      const response = await client.subscribers.fromList(listId);
      const result = response.Subscribers.map(x => `- '${x.Email}', Name: '${x.Name}', Tags: [${x.Tags.join(", ")}]`);
      return {
        content: [
          { type: "text", text: result.join("\n") }
        ]
      }
    },
  });

  server.addTool({
    name: "get_subscriber_by_email",
    description: "Get subscriber by email",
    parameters: z.object({
      listId: z.string().uuid().describe("Id of the mailing list"),
      email: z.string().email().describe("Email of the subscriber")
    }),
    annotations: {
      title: "Get subscriber by email",
      openWorldHint: true,
    },
    execute: async ({ listId, email }) => {
      try {
        const response = await client.subscribers.findByEmail(listId, email);
        type Keys = keyof typeof response;
        const keys = ['Email', 'Name', 'Tags'] as Keys[];
        return {
          content: [
            { type: "text", text: keys.map(x => `- ${x}: '${response[x]}'`).join("\n") }
          ]
        }
      }
      catch (e) {
        return {
          content: [
            { type: "text", text: `Error: ${(e as ApiResponseError).sendResponse?.Error}` }
          ]
        }
      }
    },
  });

  server.addTool({
    name: "add_subscriber",
    description: "Add subscriber to a mailing list",
    parameters: z.object({
      listId: z.string().uuid().describe("Id of the mailing list"),
      email: z.string().email().describe("Email of the subscriber"),
      name: z.string().optional().describe("Name of the subscriber"),
      tags: z.array(z.string()).optional().describe("Tags of the subscriber")
    }),
    annotations: {
      title: "Add subscriber to a mailing list",
      openWorldHint: true,
    },
    execute: async ({ listId, email, name, tags }) => {
      try {
        const response = await client.subscribers.add(listId, { Email: email, Name: name, Tags: tags });
        return {
          content: [
            { type: "text", text: `Subscriber '${response.Email}' successfully added to mailing list '${listId}'` }
          ]
        }
      }
      catch (e) {
        return {
          content: [
            { type: "text", text: `Error: ${(e as ApiResponseError).sendResponse?.Error}` }
          ]
        }
      }
    }
  });

  server.addTool({
    name: "unsubscribe_subscriber",
    description: "Unsubscribe subscriber from a mailing list",
    parameters: z.object({
      listId: z.string().uuid().describe("Id of the mailing list"),
      email: z.string().email().describe("Email of the subscriber")
    }),
    annotations: {
      title: "Unsubscribe subscriber from a mailing list",
      openWorldHint: true,
    },
    execute: async ({ listId, email }) => {
      try {
        await client.subscribers.unsubscribe(listId, email);
        return {
          content: [
            { type: "text", text: `Subscriber '${email}' successfully unsubscribed from mailing list '${listId}'` }
          ]
        }
      }
      catch (e) {
        return {
          content: [
            { type: "text", text: `Error: ${(e as ApiResponseError).sendResponse?.Error}` }
          ]
        }
      }
    }
  });

  if (transactoinalConfog.campaignId) {
    server.addTool({
      name: "send_transactional_email",
      description: "Send an email using transactional email service",
      parameters: z.object({
        to: z.string().email().describe("Email of the recipient"),
        subject: z.string().describe("Subject of the email"),
        body: z.string().describe("HTML body of the email"),
      }),
      annotations: {
        title: "Send an email using transactional email service",
        openWorldHint: true,
      },
      execute: async ({ to, subject, body }) => {
        try {
          const result = await client.transactional.sendEmail({
            Subject: subject,
            CampaignId: transactoinalConfog.campaignId!,
            Personalizations: [
              {
                To: [
                  {
                    Email: to,
                  }
                ],
              }
            ],
            Content: [
              {
                Value: body,
                Type: "text/html",
              },
            ]
          });
          return {
            content: [
              { type: "text", text: `Email sent ${result.TotalAccepted > 0 ? "successfully" : "unsuccessfully"}` }
            ]
          }
        } catch (e) {
          return {
            content: [
              { type: "text", text: `Error: ${(e as ApiResponseError).sendResponse?.Error}` }
            ]
          }
        }
      }
    });
  }
}
