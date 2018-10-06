CREATE TABLE [database].[ColumnRelationship] (
    [Id_Column]       INT NULL,
    [Id_Relationship] INT NULL,
    CONSTRAINT [FK_ColumnRelationship_Column] FOREIGN KEY ([Id_Column]) REFERENCES [database].[Column] ([Id_Column]),
    CONSTRAINT [FK_ColumnRelationship_Relationship] FOREIGN KEY ([Id_Relationship]) REFERENCES [database].[Relationship] ([Id_Relationship])
);

