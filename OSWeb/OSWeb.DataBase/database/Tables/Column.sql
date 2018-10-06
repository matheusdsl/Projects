CREATE TABLE [database].[Column] (
    [Id_Column]    INT           NOT NULL,
    [Id_Table]     INT           NULL,
    [Id_Data_Type] INT           NULL,
    [Name]         VARCHAR (300) NULL,
    [Length]       VARCHAR (10)  NULL,
    [Nullable]     BIT           NULL,
    [PrimaryKey]   BIT           NULL,
    CONSTRAINT [PK_Column] PRIMARY KEY CLUSTERED ([Id_Column] ASC),
    CONSTRAINT [FK_Column_DataType] FOREIGN KEY ([Id_Data_Type]) REFERENCES [database].[DataType] ([Id_Data_Type]),
    CONSTRAINT [FK_Column_Table] FOREIGN KEY ([Id_Table]) REFERENCES [database].[Table] ([Id_Table])
);

