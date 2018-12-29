using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace XLDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        XL.DownTaskInfo info = new XL.DownTaskInfo();
        private IntPtr a;
        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                button1.Enabled = false;
                timer1.Enabled = true;
                timer1.Interval = 500;
                var initSuccess = XL.XL_Init();
                if (initSuccess)
                {
                    XL.DownTaskParam p = new XL.DownTaskParam()
                    {
                        szTaskUrl = textBox1.Text,
                        szFilename = "1.MP3",
                        szSavePath = AppDomain.CurrentDomain.BaseDirectory
                    };
                    a = XL.XL_CreateTask(p);
                    var startSuccess = XL.XL_StartTask(a);
                }
                else
                {
                    MessageBox.Show("XL_Init初始化失败");
                }
            }
            catch (Exception ex)
            {
                button1.Enabled = true;
                MessageBox.Show(ex.Message);
            }
        }
        private void timer1_Tick(object sender, EventArgs e)
        {
            var qq = XL.XL_QueryTaskInfoEx(a, info);
            progressBar1.Value = (int)(info.fPercent * 100);
            var aa = string.Format("{0}进度{1},速度{2},状态{3}", DateTime.Now, info.fPercent, info.nSpeed, info.stat);
            listBox1.Items.Add(aa);
            if (info.stat == XL.DOWN_TASK_STATUS.TSC_COMPLETE)
            {
                button1.Enabled = true;
                timer1.Enabled = false;
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
