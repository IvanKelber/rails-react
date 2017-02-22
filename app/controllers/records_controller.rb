class RecordsController < ApplicationController

  def index
    @records = Record.all
  end

  def create
    @record = Record.new(record_params)
    if @record.save
      #handle successful creation
    else
      #handle problem
    end
  end

  def new
    @record = Record.new
  end

  private

    def record_params
      params.require(:record).permit(:title,:date,:amount)
    end

end
