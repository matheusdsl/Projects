CREATE TABLE [database].[Data] (
    [Id_Column]   INT           NOT NULL,
    [Id_Row]      INT           NOT NULL,
    [Value]       VARCHAR (MAX) NULL,
    [Active]      BIT           NULL,
    [Insert_Date] DATETIME      NULL,
    [Update_Date] DATETIME      NULL,
    CONSTRAINT [FK_Data_Column] FOREIGN KEY ([Id_Column]) REFERENCES [database].[Column] ([Id_Column]),
    CONSTRAINT [FK_Data_Row] FOREIGN KEY ([Id_Row]) REFERENCES [database].[Row] ([Id_Row])
);

