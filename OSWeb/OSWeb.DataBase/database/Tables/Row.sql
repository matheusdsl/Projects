CREATE TABLE [database].[Row] (
    [Id_Row]      INT      NOT NULL,
    [Id_Reg]      INT      NULL,
    [Active]      BIT      NULL,
    [Insert_Date] DATETIME NULL,
    [Update_Date] DATETIME NULL,
    CONSTRAINT [PK_Row] PRIMARY KEY CLUSTERED ([Id_Row] ASC)
);

