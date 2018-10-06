CREATE TABLE [database].[Database] (
    [Id_Database] INT           NOT NULL,
    [Name]        VARCHAR (300) NULL,
    [Description] VARCHAR (500) NULL,
    CONSTRAINT [PK_Database] PRIMARY KEY CLUSTERED ([Id_Database] ASC)
);

