CREATE TABLE [database].[Schema] (
    [Id_Schema]   INT           NOT NULL,
    [Id_Database] INT           NULL,
    [Name]        VARCHAR (300) NULL,
    CONSTRAINT [PK_Schema] PRIMARY KEY CLUSTERED ([Id_Schema] ASC),
    CONSTRAINT [FK_Schema_Database] FOREIGN KEY ([Id_Database]) REFERENCES [database].[Database] ([Id_Database])
);

