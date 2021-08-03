export const completion: Fig.Spec = {
  name: "fmsadmin",
  description: "",
  subcommands: [
    {
      name: "HELP",
      description: "See a list of available commands",
    },
    {
      name: "AUTORESTART",
      description: "Get or set auto-restart for the Admin Server or FMSE",
      subcommands: [
        {
          name: "ADMINSERVER",
          description: "The Admin Server",
          subcommands: [
            {
              name: "ON",
              description: "Turn on auto-restart",
            },
            {
              name: "OFF",
              description: "Turn off auto-restart",
            },
          ],
        },
        {
          name: "FMSE",
          description: "The FileMaker Script Engine process",
          subcommands: [
            {
              name: "ON",
              description: "Turn on auto-restart",
            },
            {
              name: "OFF",
              description: "Turn off auto-restart",
            },
          ],
        },
      ],
    },
    {
      name: "BACKUP",
      description: "Back up databases",
    },
    {
      name: "CERTIFICATE",
      description: "Manage SSL certificates",
    },
    {
      name: "CLEARKEY",
      description: "Removes saved database encryption passwords",
    },
    {
      name: "CLOSE",
      description: "Close databases",
      isDangerous: true,
    },
    {
      name: "DISABLE",
      description: "Disable schedule or detailed statistics logging",
    },
    {
      name: "DISCONNECT",
      description: "Disconnect a client",
      isDangerous: true,
    },
    {
      name: "ENABLE",
      description: "Enable schedules or detailed statistics logging",
    },
    {
      name: "GET",
      description: "Retrieve server or CWP configuration settings",
    },
    {
      name: "LIST",
      description: "List clients, databases, plug-ins, or schedules",
    },
    {
      name: "OPEN",
      description: "Open databases",
    },
    {
      name: "PAUSE",
      description: "Temporarily stop database access",
    },
    {
      name: "REMOVE",
      description: "Move databases out of hosted folder or remove empty folder",
      isDangerous: true,
    },
    {
      name: "RESETPW",
      description: "Reset admin user password",
    },
    {
      name: "RESTART",
      description: "Restart a Server process",
    },
    {
      name: "RESUME",
      description: "Make paused databases available",
    },
    {
      name: "RUN",
      description: "Run a schedule",
    },
    {
      name: "SEND",
      description: "Send a message",
    },
    {
      name: "SET",
      description: "Change server or CWP configuration settings",
    },
    {
      name: "START",
      description: "Start a Server process",
    },
    {
      name: "STATUS",
      description: "Get status of clients of databases",
    },
    {
      name: "STOP",
      description: "Stop a Server process",
      isDangerous: true,
    },
    {
      name: "VERIFY",
      description: "Check the consistency of databases",
    },
    {
      name: "WPE",
      description: "Add, remove and list FileMaker WebDirect worker machines",
    },
  ],
  options: [
    {
      name: ["-h", "--help"],
      description: "Print the CLI built-in help page.",
    },
    {
      name: ["-p", "--password"],
      description:
        "Specify the password to use to authenticate the server. See OPEN command for information about password parameters for opening encrypted databases.",
      args: {},
    },
    {
      name: ["-u", "--username"],
      description:
        "Specify username and/or domain name to use to connect to FileMaker Server.",
      args: {},
    },
    {
      name: ["-v", "--version"],
      description: "Print version information",
    },
    {
      name: ["-w", "--wait"],
      description: "Specify time in seconds for command to time out.",
      args: {},
    },
    {
      name: ["-y", "--yes"],
      description: "Automatically answer yes to all command prompts.",
    },
  ],
  // Only uncomment if fmsadmin takes an argument
  // args: {}
};
