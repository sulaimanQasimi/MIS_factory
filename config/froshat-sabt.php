<?php
  include_once("database.php");
  include("jdf.php");
 ?>
<?php 
if(!isset($_SERVER['HTTP_REFERER'])){
    // redirect them to your desired location
    header('location:index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="fa">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- style -->


        <link rel="stylesheet" href="DataTables/datatables.min.css" />
        <link rel="stylesheet" href="assets/css/talabat-sabt.css">

        <link rel="stylesheet" href="assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/css/bootstrap-rtl.min.css">
        <link rel="stylesheet" href="assets/css/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/main.css">
        <link rel="stylesheet" href="assets/css/responsive.css">
        <link rel="icon" type="icon" href="assets/img/logo-site-faranesh.png">
        <link rel="stylesheet" href="assets/fonts/themify-icons/themify-icons.css">
        <link rel="stylesheet" href="assets/css/persian-datepicker.css">
        <link type="text/css" href="assets/css/persian-datepicker.css" rel="stylesheet" />
        <!-- script -->


        <script src="DataTables/datatables.min.js"></script>
        <script src="assets/js/script.js"></script>
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/popper.min.js"></script>
        <script type="text/javascript" src="assets/js/persian-datepicker.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/persian-datepicker.js"></script>
        <script src="assets/js/a12e8bdfba.js" crossorigin="anonymous"></script>

        <script>
        $(function() {
            $('#date-man').datepicker({
                changeMonth: true,
                changeYear: true
            });
        });
        </script>
        <script>
        function myFunction2() {
            window.print();
        }

        function myFunction() {
            window.print();
        }
        </script>


    </head>


    <style>
    .edt {
        border: none;
        border-radius: 50%;
        padding: 5px;
        float: left;
        margin-right: 10px;
        width: 30px;
        height: 30px;
        background-color: rgb(23, 132, 221);
        cursor: pointer;
        /* position: relative; */
    }

    .edt-sp {
        position: absolute;
        transition: 400ms;
        overflow: hidden;

    }

    @media screen {

        #printarea2 {
            display: none;
        }
    }

    .head th,
    .head td {
        width: 100px;
    }

    @media print {

        .nonprint {
            display: none;
        }

        .card {
            height: 100px !important;
        }

        .title {
            display: none;
        }

        #icon {
            display: none;
        }

        button {
            display: none;
        }

        a {
            display: none;
        }
    }

    .edt-sp:hover {
        transition: 400ms;
        width: 90px;
        border-radius: 40px;
    }
    </style>
    <style>
    table {
        margin-top: 20px;
        padding: 20px;
    }

    .tr_s td {
        padding-right: 10px;
    }
    </style>
    <script>
    $(document).ready(() => {
        $('#table-man').dataTable({
            filter: false,
            pagination: false
        });
    });
    </script>

    <!-- Button trigger modal-->




    <?php 

// part edit  alarm
    if(isset($_GET["froshat_id"])){
        $id = $_GET["froshat_id"];
        $sql_query = mysqli_query($connection,"select * from froshat_add where id='$id'");
        $fetch1 = mysqli_fetch_assoc($sql_query);
?>

    <?php 

if (isset($_POST["button11"])) {
 

  $amount = $_POST["amount"];
  $details = $_POST["details"];
 

  $date_sh = $_POST["date_sh"];
    $date_sh_exp = explode("/",$date_sh);
    $date_m =  jalali_to_gregorian($date_sh_exp[2],$date_sh_exp[1],$date_sh_exp[0],'/');
  
 
  $sql_query_01 = mysqli_query($connection,"INSERT INTO `froshat_add` (`id`,`amount`, `details`,`date_sh`, `date_m`)
   VALUES (NULL, '$amount', '$details', '$date_sh', '$date_m')");



   }

  }

?>



    <body class="my-login-page">
        <section class="h-100" style=" padding:0px !important;">
            <div class="container-fluid h-100" style=" width:100%;">


                <div id="printarea2" media="screen">

                    <form method="post" id="form_upload">

                        <header colspan="4" style="text-align:center;  color:#1271BA;">
                            <span style="font-size:30px; position:relative;"> پرزه فروشی گاز مایع ( LPG )
                                عدالت </span>

                        </header>
                        <center>
                            <span style="float:center; font-size:28px; "><b>وارد کننده وسایل نفتی و گاز مایع ،
                                    همچنان ساخت وساز تاسیسات های بلند تناژ و کوچک در سطح ولایات
                            </span></b><br>


                            <span style="float:center;">ایمیل آدرس: naserbelal1@gmail.com
                            </span>
                            <br>


                        </center>
                        <b><span style="float:right; color:#1271BA;">عمده
                            </span>
                            <span style="float:left; color:#1271BA;">پرچون
                            </span></b>

                </div>

                <div class="card-wrapper" style="width:100%;margin-top:1%; ">

                    <div class="card-body">

                        <h3 style="text-align: center;" class="title"> فروشات ثبت شده</h3>
                        <h3 style="text-align: center;" id="printarea2"> بیلانس مشتری </h3>
                        <table class="table table-bordered nonprint" style="width:100%; float:right;">

                            <tr>

                                <form action="" method="post">
                                    <td>

                                        <input type="text" placeholder="نمبر بل یا اسم مشتری" class="form-control"
                                            id="myInput" name="search_box">
                                    </td>
                                    <td>

                                        <input type="text" placeholder="از تاریخ" class="form-control" id="date_from"
                                            name="From">
                                    </td>
                                    <td>

                                        <input type="text" placeholder="تا تاریخ" class="form-control" id="date_to"
                                            name="to">
                                    </td>
                                    <td>
                                        <input type="submit" value="جستجو" style="width:100%" class="btn btn-primary"
                                            name="search_btn_submit">
                                    </td>

                                    <td>
                                        <button type="button" onclick="window.open('froshat-sabt.php','_self');"
                                            style="width:100%; height:35px;" class="fa fa-filter btn btn-success"
                                            name="clear_filter"></button>
                                    </td>
                                </form>
                            </tr>
                        </table>
                        <div class="bs-example">
                            <div class="accordion" id="accordionExample">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="head">
                                            <td>شماره</td>

                                            <td> کود مشتری</td>
                                            <td>تاریخ</td>
                                            <td> نمبر بل</td>
                                            <td>اسم مشتری</td>

                                            <td>مجموعه</td>
                                            <td>رسید</td>
                                            <td>باقیداری</td>

                                            <th id="icon" class="print">عملیات</td>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                        <tr>
                                            <th colspan="10" style=" padding: 0px;">
                                                <?php
                                                $sql_query_02 = null;
                                                $sql_query_03 = null;
                                                if(isset($_POST["search_btn_submit"])){
                                                  $search_box = $_POST["search_box"];  
                                                 
                                                  $from_sh=null;
                                                    $to_sh = null;
                                                    $from_m = null;
                                                    $to_m = null;
                                                    if($_POST["From"] != ""){
                                                  $from_sh = $_POST["From"];
                                                    $from_sh_exp = explode("/",$from_sh);
                                                    $from_m =  jalali_to_gregorian($from_sh_exp[2],$from_sh_exp[1],$from_sh_exp[0],'/');
                                                    
                                                    $to_sh = $_POST["to"];
                                                    $to_sh_exp = explode("/",$to_sh);
                                                    $to_m =  jalali_to_gregorian($to_sh_exp[2],$to_sh_exp[1],$to_sh_exp[0],'/');
            
                                                }
                                                
                                                    $sql_query_02 = mysqli_query($connection,"select * from froshat_details where customer_full_name = '$search_box' OR cus_code_no = '$search_box' OR invoice_details LIKE '%$search_box%' OR date_m between '$from_m' and '$to_m'");
                                               
                                                } else{
                                                    $sql_query_02 = mysqli_query($connection,"select * from froshat_details");
                                                
    
                                                }
                                               
                                                $count = 1;
                                                while ($fetch_02 = mysqli_fetch_assoc($sql_query_02)) {
                                                ?>
                                                <div class="card mb-2" id="card_<?php echo $count; ?>"
                                                    style=" padding: 0px;">
                                                    <div class="card-header " style="padding: 0px;" id="headingOne">
                                                        <table class=" mb-0 mt-0 ml-0 mr-0" style="width: 100%;">

                                                            <tr class="head tr_s" style="text-align:center; ">
                                                                <td class="b_font"><?php echo $count; ?></td>

                                                                <td class="b_font"><?php  
                                                                            echo $fetch_02["cus_code_no"]; ?></td>


                                                                <td class="b_font">
                                                                    <?php echo $fetch_02["date_sh"];?></td>

                                                                <td class="b_font text text-success"><?php  
                                                                            $invoice = explode(",",$fetch_02["invoice_details"]);
                                                                            echo $invoice[0]; ?></td>

                                                                <td class="b_font"><?php  
                                                                            echo $fetch_02["customer_full_name"]; ?>
                                                                </td>





                                                                <td class="b_font">
                                                                    <?php echo $fetch_02["total"];?></td>

                                                                <td class="b_font">
                                                                    <?php echo $fetch_02["rasid"];?></td>

                                                                <td class="b_font" style="padding-right:70px;">
                                                                    <?php echo $fetch_02["total"]-$fetch_02["rasid"];?>
                                                                </td>


                                                                <td class="b_font print" id="icon">
                                                                    <!-- <button title="ضمیمه" class="edt attach-tbl"><img width="15px" src="assets/img/attach.svg" alt=""></button> -->



                                                                    <button title="برگشت بل"
                                                                        onclick="revise(<?php echo $fetch_02['id'] ;?>)"
                                                                        class="edt del"><img width="10px"
                                                                            src="assets/img/reverse.png"
                                                                            alt=""></button>

                                                                    <button title="اضافه کردن"
                                                                        onclick="add(<?php echo $fetch_02['id'] ;?>)"
                                                                        class="edt add-tbl"><img width="10px"
                                                                            src="assets/img/add3.png" alt=""></button>
                                                                    <button title="چاپ"
                                                                        onclick="printdiv(<?php echo $count; ?>)"
                                                                        class="edt del"><img width="10px"
                                                                            src="assets/img/print.png" alt=""></button>

                                                                </td>


                                                            </tr>
                                                        </table>
                                                        <h2 class="mb-0">
                                                            <button type="button" class="btn btn-link"
                                                                data-toggle="collapse"
                                                                data-target="#collapse_<?php echo $count; ?>"
                                                                style="float:left;"><img
                                                                    src="assets/img/expand_arrow_26px.png"
                                                                    onclick="change_icon(this.id)"
                                                                    id="img_<?php echo $count; ?>" alt=""></button>
                                                        </h2>
                                                    </div>
                                                    <script>
                                                    var count = 2;

                                                    function change_icon(id) {
                                                        $("#" + id).css({
                                                            "transition-duration": "1s"
                                                        });
                                                        if (count % 2 == 0) {
                                                            slide_up(id);
                                                        } else {
                                                            slide_down(id);
                                                        }
                                                        count++;
                                                    }

                                                    function slide_up(id) {
                                                        $("#" + id).css({
                                                            "transform": "rotate(180deg)"
                                                        });

                                                    }

                                                    function slide_down(id) {
                                                        $("#" + id).css({
                                                            "transform": "rotate(360deg)"
                                                        });

                                                    }
                                                    </script>
                                                    <div id="collapse_<?php echo $count; ?>" class="collapse"
                                                        aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div class="card-body">
                                                            <table class="table table-bordered">

                                                                <thead>
                                                                    <tr>
                                                                        <th colspan="6">جزءیات بل فروش</th>
                                                                    </tr>
                                                                    <tr
                                                                        style="background-color: lightgray; color: black;">
                                                                    <tr>
                                                                        <td>شماره</td>
                                                                        <td>نام جنس</td>
                                                                        <td>انچ</td>
                                                                        <td>تعداد</td>
                                                                        <td>قیمت</td>
                                                                        <td>مجموع</td>
                                                                    </tr>

                                                                </thead>
                                                                <tbody>
                                                                    <?php 
                                            $id = $fetch_02["id"];
                                            
                                            $sql_query_03 = mysqli_query($connection,"select count(quantity) as total34, sum(cost) as total35, sum(cost*quantity) as total36 from froshat where rasid_id='$id'"); 
                                            $sql_query_04 = mysqli_query($connection,"select * from froshat where rasid_id='$id'"); 
                                            $fetch_04 = mysqli_fetch_assoc($sql_query_03);
                                            $count2 = 1;
                                            while($fetch_03 = mysqli_fetch_assoc($sql_query_04)){
                                        ?>
                                                                    <tr>
                                                                        <td class="b_font"><?php echo $count2;?></td>
                                                                        <td class="b_font">
                                                                            <?php echo $fetch_03["item_name"];?></td>
                                                                        <td class="b_font">
                                                                            <?php echo $fetch_03["inch"];?></td>

                                                                        <td class="b_font">
                                                                            <?php echo $fetch_03["quantity"];?></td>
                                                                        <td class="b_font">
                                                                            <?php echo $fetch_03["cost"];?></td>
                                                                        <td class="b_font">
                                                                            <?php echo $fetch_03["cost"]*$fetch_03["quantity"];?>
                                                                        </td>
                                                                    </tr>
                                                                    <?php
                                                $count2++;
                                            }
                                        ?>
                                                                    <tr>

                                                                        <td class="b_font" colspan="2">تعداد جنس:
                                                                            <?php echo $fetch_04["total34"];?></td>
                                                                        <td class="b_font" colspan="2">قیمت:
                                                                            <?php echo $fetch_04["total35"],"","$";?>
                                                                        </td>
                                                                        <td class="b_font" colspan="2">مجموعه :
                                                                            <?php echo $fetch_04["total36"],"","$";?>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <br>
                                                            <br>
                                                            <table class="table table-striped">
                                                                <center>
                                                                    <h5>لیست رسیدات مشتری</h5>
                                                                </center>
                                                                <tr>
                                                                    <td>شماره</td>
                                                                    <td>تاریخ</td>
                                                                    <td>جزئیات</td>
                                                                    <td>مقدار</td>
                                                                    <td>بیلانس</td>

                                                                </tr>
                                                                <?php 
                                                $total_bilans= 0;
                                                $m_id = $fetch_02["id"];
                                                
                                                $sql_query_03 = mysqli_query($connection,"select amount as total44 from froshat_add where froshat_id='$id'"); 
                                                $sql_query_04 = mysqli_query($connection,"select * from froshat_add where froshat_id='$id'"); 
                                                $fetch_14 = mysqli_fetch_assoc($sql_query_03);
                                                $count2 = 1;
                                                while($fetch_03 = mysqli_fetch_assoc($sql_query_04)){
                                            ?>
                                                                <tr>
                                                                    <td class="b_font"><?php echo $count2;?></td>
                                                                    <td class="b_font">
                                                                        <?php echo $fetch_03["date_sh"];?></td>


                                                                    <td class="b_font">
                                                                        <?php echo $fetch_03["details"];?></td>
                                                                    <td class="b_font"><?php echo $fetch_03["amount"];?>
                                                                    </td>
                                                                    <td class="b_font">
                                                                        <?php echo ($total_bilans = $total_bilans + $fetch_03["amount"]),"","$";?>
                                                                    </td>


                                                                </tr>
                                                                <?php
                                                                        $count2++;
                                                                    }
                                                                ?>
                                                                <tr>


                                                                    <td class="b_font" colspan="5">مجموع عمومی رسیدات :
                                                                        <?php echo $fetch_14["total44"]," ","$";?></td>
                                                                </tr>



                                                            </table>

                                                        </div>
                                                    </div>
                                                </div>
                                                <?php 
                                                $count++;
                                            } ?>

                                            </th>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>

                    <footer style="color:black;" id="printarea2">
                        <span> آدرس دفتر مرکزی: شهر مزارشریف، پل تصدی مقابل تانک تیل جمشیدی نمبر 1، سرای عدالت -
                            0790570001 ،
                            0786208689 ، 0789570001</span><br>
                        <span> نمایندگی دوم : حیرتان ، جوار میوند بانک - 0799174160 ، 07877040760 </span><br>
                        <span> نمایندگی سوم : جلال آباد ، گولاهی بگرامی ، مقابل هوتل امارات - 0782889900 ،
                            0785544341 ،
                            0792889900 </span>

                    </footer>

                    </tbody>
                    <style>
                    thead {
                        background-color: #157fd1;
                        color: white;
                        font-weight: lighter;
                        border-radius: 20px;

                    }
                    </style>

                    </table>


                </div>
            </div>
            </div>

            <a href="#back-top" style="display: none;" class="go-top"><i class="fa fa-angle-up"></i></a>
            <script>
            /****************************************
             *       Basic Table                   *
             ****************************************/
            $(function() {
                $('#date-man').datepicker({
                    changeMonth: true,
                    changeYear: true
                });
            });


            function delet(id) {
                var confirm = window.confirm(
                    "اطلاعات حذف خواهد شد برای رد کردن گزینه cancel را بزنید ");
                if (confirm == true) {
                    window.open("delete.php?froshat_id=" + id, "_self");
                } else {

                }
            }
            </script>


            <script src="assets/js/script.js"></script>
            <script>
            function add(id) {
                window.open("froshat_rasid.php?froshat_id=" + id, "_self");
            }


            function revise(id) {
                window.open("revise.php?revise_id=" + id, "_self");
            }

            $(document).ready(function() {
                $("#myInput").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("#tbody tr").filter(function() {
                        $(this).toggle($(this).text().toLowerCase().indexOf(
                            value) > -1)
                    });
                });
            });
            </script>
            <script type="text/javascript">
            $(function() {

                $('#date_from').datepicker({
                    changeMonth: true,
                    changeYear: true
                });
                $('#date_to').datepicker({
                    changeMonth: true,
                    changeYear: true
                });
            });
            </script>
    </body>

    <script>
    function printdiv(divname) {
        // var header =
        //     '<tr class="head"> <td> شماره < /td><td > کود مشتری < /td> <td > تاریخ < /td> <td > نمبر بل < /td> <td > اسم مشتری < /td><td > مجموعه < /td> <td > رسید < /td> <td > باقیداری < /td><th id = "icon" class = "print" > عملیات < /td> </tr>';
        var real_id = "card_" + divname;
        var printContent = document.getElementById(real_id).innerHTML;
        var orginalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = orginalContent;
    }
    </script>

</html>