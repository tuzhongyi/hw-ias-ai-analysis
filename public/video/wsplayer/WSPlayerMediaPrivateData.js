function PrivateRule () {
  this.RuleID = 0;
  this.VertexNumber = 0;
  this.Point = [];
}
PrivateRule.load = function (dataview, offset) {
  let struct = new PrivateRule();
  struct.RuleID = dataview.getInt32(offset, true)
  offset += 4;
  struct.VertexNumber = dataview.getInt32(offset, true);
  offset += 4;
  struct.Point = [];
  for (let i = 0; i < struct.VertexNumber; i++) {
    let result = PrivatePointF.load(dataview, offset);
    struct.Point.push(result.struct)
    offset = result.offset
  }
  return {
    struct: struct,
    offset: offset
  }
}
// 8bytes
function PrivatePointF () {
  this.X = 0.0
  this.Y = 0.0
}
PrivatePointF.load = function (dataview, offset) {
  let struct = new PrivatePointF();
  struct.X = dataview.getFloat32(offset, true);
  offset += 4;
  struct.Y = dataview.getFloat32(offset, true);
  offset += 4;
  return {
    struct: struct,
    offset: offset
  }
}
function PrivateRuleList () {
  this.RuleNumber = 0;
  this.Rule = []
}
PrivateRuleList.load = function (dataview, offset) {
  let struct = new PrivateRuleList();
  struct.RuleNumber = dataview.getInt32(offset, true)
  struct.Rule = [];
  offset += 4;
  for (let i = 0; i < struct.RuleNumber; i++) {
    let result = PrivateRule.load(dataview, offset)
    struct.Rule.push(result.struct)
    offset = result.offset;
  }
  return struct;
}

function PrivateTargetList () {
  this.TargetNumber = 0;
  this.Target = []
}
PrivateTargetList.load = function (dataview, offset) {
  let struct = new PrivateTargetList();
  struct.TargetNumber = dataview.getInt32(offset, true)
  offset += 4;
  struct.Target = [];
  for (let i = 0; i < 16; i++) {
    let result = PrivateTarget.load(dataview, offset);
    struct.Target.push(result.struct)
    offset = result.offset;
  }
  struct.Target.slice(0, struct.TargetNumber)
  return struct;
}
function PrivateTarget () {
  this.Id = 0;
  this.BlobType = 0;
  this.Confidence = 0;
  this.VertexNumber = 0;
  this.Point = []
}
PrivateTarget.load = function (dataview, offset) {
  let struct = new PrivateTarget();
  struct.Id = dataview.getInt32(offset, true);
  offset += 4;
  struct.BlobType = dataview.getInt32(offset, true);
  offset += 4;
  struct.Confidence = dataview.getInt32(offset, true);
  offset += 4;
  struct.VertexNumber = dataview.getInt32(offset, true);
  offset += 4;
  struct.Point = [];
  for (let i = 0; i < 10; i++) {
    let result = PrivatePointF.load(dataview, offset);
    struct.Point.push(result.struct)
    offset = result.offset;
  }
  struct.Point = struct.Point.slice(0, struct.VertexNumber)

  return {
    struct: struct,
    offset: offset
  }
}