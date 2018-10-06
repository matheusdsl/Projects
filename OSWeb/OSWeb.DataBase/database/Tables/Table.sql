CREATE TABLE [database].[Table] (
    [Id_Table]    INT           NOT NULL,
    [Id_Schema]   INT           NULL,
    [Name]        VARCHAR (300) NULL,
    [Description] VARCHAR (500) NULL,
    CONSTRAINT [PK_Table] PRIMARY KEY CLUSTERED ([Id_Table] ASC),
    CONSTRAINT [FK_Table_Schema] FOREIGN KEY ([Id_Schema]) REFERENCES [database].[Schema] ([Id_Schema])
);

