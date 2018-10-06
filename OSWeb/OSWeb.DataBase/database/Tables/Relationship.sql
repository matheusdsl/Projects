CREATE TABLE [database].[Relationship] (
    [Id_Relationship]      INT NOT NULL,
    [Id_Column_Source]     INT NULL,
    [Id_Column_Destiny]    INT NULL,
    [Id_Relationship_Type] INT NULL,
    CONSTRAINT [PK_Relationship] PRIMARY KEY CLUSTERED ([Id_Relationship] ASC),
    CONSTRAINT [FK_Relationship_RelationshipType] FOREIGN KEY ([Id_Relationship_Type]) REFERENCES [database].[RelationshipType] ([Id_Relationship_Type])
);

