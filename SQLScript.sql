USE [master]
GO
/****** Object:  Database [TEKNIK_SERVIS]    Script Date: 12.01.2023 20:54:28 ******/
CREATE DATABASE [TEKNIK_SERVIS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TEKNIK_SERVIS', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\TEKNIK_SERVIS.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TEKNIK_SERVIS_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\TEKNIK_SERVIS_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [TEKNIK_SERVIS] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TEKNIK_SERVIS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TEKNIK_SERVIS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET ARITHABORT OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET  MULTI_USER 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TEKNIK_SERVIS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TEKNIK_SERVIS] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [TEKNIK_SERVIS] SET QUERY_STORE = OFF
GO
USE [TEKNIK_SERVIS]
GO
/****** Object:  Table [dbo].[tbl_personel]    Script Date: 12.01.2023 20:54:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_personel](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[personel_adi] [nvarchar](50) NOT NULL,
	[personel_eposta] [nvarchar](50) NOT NULL,
	[personel_sifre] [nvarchar](30) NOT NULL,
	[personel_telefon] [nvarchar](15) NOT NULL,
	[personel_yetki] [nchar](15) NOT NULL,
 CONSTRAINT [PK_tbl_personel] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_servis_islem]    Script Date: 12.01.2023 20:54:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_servis_islem](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[servis_id] [int] NOT NULL,
	[tarih] [datetime] NOT NULL,
	[personel_id] [int] NOT NULL,
	[yeni_durum] [int] NOT NULL,
	[aciklama] [int] NOT NULL,
 CONSTRAINT [pk_tbl_servis_islem] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_teknikservis]    Script Date: 12.01.2023 20:54:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_teknikservis](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[servis_tanim] [nvarchar](50) NOT NULL,
	[servis_aciklama] [nvarchar](max) NOT NULL,
	[baslangic_tarihi] [datetime] NULL,
	[teslim_tarihi] [datetime] NULL,
	[personel_id] [int] NOT NULL,
	[yapilan_islem] [nvarchar](max) NULL,
	[ariza_durum] [int] NOT NULL,
 CONSTRAINT [PK_tbl_teknikservis] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Index [idx_servis_islem__servis_id]    Script Date: 12.01.2023 20:54:29 ******/
CREATE NONCLUSTERED INDEX [idx_servis_islem__servis_id] ON [dbo].[tbl_servis_islem]
(
	[servis_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_personel] ADD  CONSTRAINT [DF_tbl_personel_personel_yetki]  DEFAULT (N'Öğrenci') FOR [personel_yetki]
GO
ALTER TABLE [dbo].[tbl_teknikservis] ADD  CONSTRAINT [DF_tbl_teknikservis_baslangic_tarihi]  DEFAULT (dateadd(minute,(180),getdate())) FOR [baslangic_tarihi]
GO
ALTER TABLE [dbo].[tbl_teknikservis] ADD  CONSTRAINT [DF_tbl_teknikservis_ariza_durum]  DEFAULT ((1)) FOR [ariza_durum]
GO
ALTER TABLE [dbo].[tbl_servis_islem]  WITH CHECK ADD  CONSTRAINT [fk_servis_islem__personel_id] FOREIGN KEY([personel_id])
REFERENCES [dbo].[tbl_personel] ([id])
GO
ALTER TABLE [dbo].[tbl_servis_islem] CHECK CONSTRAINT [fk_servis_islem__personel_id]
GO
ALTER TABLE [dbo].[tbl_servis_islem]  WITH CHECK ADD  CONSTRAINT [fk_servis_islem__servis_id] FOREIGN KEY([servis_id])
REFERENCES [dbo].[tbl_teknikservis] ([id])
GO
ALTER TABLE [dbo].[tbl_servis_islem] CHECK CONSTRAINT [fk_servis_islem__servis_id]
GO
ALTER TABLE [dbo].[tbl_teknikservis]  WITH CHECK ADD  CONSTRAINT [FK_tbl_teknikservis_tbl_personel] FOREIGN KEY([personel_id])
REFERENCES [dbo].[tbl_personel] ([id])
GO
ALTER TABLE [dbo].[tbl_teknikservis] CHECK CONSTRAINT [FK_tbl_teknikservis_tbl_personel]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'1. Yeni kayıt 2. Çözülmüş 3. Kapatılmış' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'tbl_teknikservis', @level2type=N'COLUMN',@level2name=N'ariza_durum'
GO
USE [master]
GO
ALTER DATABASE [TEKNIK_SERVIS] SET  READ_WRITE 
GO
